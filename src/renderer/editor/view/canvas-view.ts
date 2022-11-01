import {Canvas, GrDirectContext, Surface, TypefaceFontProvider} from "@skeditor/canvaskit-wasm";
import {CanvasKitPromised, getFontProvider} from "../utils";
import {BehaviorSubject, Observable} from "rxjs";
import sk from "../utils/canvas-kit";
import {Rect} from "../base/rect";
import {Disposable} from "../base/disposable";
import invariant from "ts-invariant";
import {SkyPageView} from "./page-view";
import {PageState} from "./page-state";
import {debounceTime} from "rxjs/operators";
import {initCellView} from "../page/init-cell-page";

export class CanvasView extends Disposable {
    static currentContext: CanvasView;
    canvasEl$ = new BehaviorSubject<HTMLCanvasElement | undefined>(undefined);
    private grContext!: GrDirectContext;
    private skSurface!: Surface;
    skCanvas!: Canvas;
    fontProvider!: TypefaceFontProvider;
    pageState = new PageState();

    private dpi = 1;
    private frame = new Rect();
    pageView?: SkyPageView;
    private dirty = true;

    protected constructor(private foreignEl: HTMLElement) {
        super();
        CanvasView.currentContext = this;

        this.createCanvasEl();
        this.attachParentNode(foreignEl);
    }

    static async create(foreignEl: HTMLElement) {
        await CanvasKitPromised;
        const canvasView = new CanvasView(foreignEl);
        canvasView.fontProvider = getFontProvider();
        canvasView.pageView = await initCellView();
        canvasView.startTick();
        return canvasView;
    }

    /**
     * canvas 应该在 resize 事件触发的时候调整大小
     * width 和 style.width 都要手动控制以保持一致, 才能不变形。
     */
    private createCanvasEl() {
        const canvasEl = document.createElement('canvas');
        canvasEl.style.display = 'block';
        this.grContext = sk.CanvasKit.MakeGrContext(sk.CanvasKit.GetWebGLContext(canvasEl));

        this.canvasEl$.next(canvasEl);
    }

    private attachParentNode(el: HTMLElement) {
        const canvasEl = this.canvasEl$.value;
        invariant(canvasEl && !canvasEl.parentElement, 'Should not attach again!');
        el.appendChild(canvasEl);
        this.doResize();

        this._disposables.push(
            new Observable((sub) => {
                const ro = new ResizeObserver(() => {
                    sub.next();
                });
                ro.observe(el);
                return () => ro.disconnect();
            })
                .pipe(debounceTime(200))
                .subscribe(() => {
                    this.doResize();
                })
        );
    }

    private doResize(force = false) {
        const bounds = this.foreignEl.getBoundingClientRect();
        if (!force && this.frame.width === bounds.width && this.frame.height === bounds.height) {
            return;
        }

        const canvasEl = this.canvasEl$.value!;

        this.frame.width = bounds.width;
        this.frame.height = bounds.height;
        this.dpi = window.devicePixelRatio;

        canvasEl.style.width = `${bounds.width}px`;
        canvasEl.style.height = `${bounds.height}px`;

        const canvasWidth = this.frame.width * this.dpi;
        const canvasHeight = this.frame.height * this.dpi;

        canvasEl.width = canvasWidth;
        canvasEl.height = canvasHeight;
    }

    private startTick() {
        const handler = () => {
            if (this._disposed) return;
            this.render();
            setTimeout(handler, 16);
        };
        setTimeout(handler, 16);
    }

    markDirty() {
        this.dirty = true;
    }

    private createSkSurfaceAndCanvas() {
        this.skSurface?.delete();
        this.skSurface = undefined;
        const canvasEl = this.canvasEl$.value!;
        const surface = sk.CanvasKit.MakeOnScreenGLSurface(
            this.grContext,
            canvasEl.width,
            canvasEl.height,
            sk.CanvasKit.ColorSpace.SRGB
        );
        if (!surface) return;
        this.skSurface = surface;

        this.skCanvas = this.skSurface.getCanvas();
        invariant(this.skCanvas, 'Cant create sk canvas');
    }

    private render() {
        if (!this.dirty) return;
        this.createSkSurfaceAndCanvas();
        if (!this.skSurface) return;
        this.skCanvas.clear(sk.CanvasKit.TRANSPARENT);
        if (this.pageView) {
            const start = Date.now();
            this.skCanvas.save();
            this.skCanvas.scale(this.dpi, this.dpi);
            this.pageView?.render();
            this.skCanvas.restore();
            this.skSurface.flush();
            console.log('>>> render costs:', Date.now() - start);
        }
        this.dirty = false;
    }
}
