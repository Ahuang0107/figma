import {Canvas, GrDirectContext, Surface, TypefaceFontProvider} from "@skeditor/canvaskit-wasm";
import {CanvasKitPromised, getFontProvider} from "../utils";
import {BehaviorSubject, debounceTime, Observable} from "rxjs";
import sk from "../utils/canvas-kit";
import {Rect} from "../base/rect";
import {Disposable} from "../base/disposable";
import invariant from "ts-invariant";
import {SkyPageView} from "./page-view";
import {SkyTextView} from "./text-view";
import {bookings, staffs} from "../../../client";
import {SkyPathView} from "./path-view";

export class CanvasView extends Disposable {
    static currentContext: CanvasView;
    private canvasEl$ = new BehaviorSubject<HTMLCanvasElement | undefined>(undefined);
    private grContext!: GrDirectContext;
    private skSurface!: Surface;
    skCanvas!: Canvas;
    fontProvider!: TypefaceFontProvider;

    private dpi = 1;
    private frame = new Rect();

    pageView?: SkyPageView = new SkyPageView();

    protected constructor(private foreignEl: HTMLElement) {
        super();
        CanvasView.currentContext = this;

        this.createCanvasEl();
        this.attachParentNode(foreignEl);
        this.startTick();
    }

    static async create(foreignEl: HTMLElement) {
        await CanvasKitPromised;
        const canvasView = new CanvasView(foreignEl);
        canvasView.fontProvider = getFontProvider();
        {
            const origin = 1666659600000;
            const scaleX = 25;
            const cellHeight = 20;
            const cellMargin = 5;

            let staffRes = await staffs();
            let bookingRes = await bookings();

            let index = 0;
            staffRes.forEach(staff => {
                // @ts-ignore
                bookingRes[staff.id]?.forEach(booking => {
                    const beforeStart = scaleX * (booking.start_time - origin) / 1000 / 60 / 60 / 24;
                    const during = scaleX * (booking.end_time - booking.start_time) / 1000 / 60 / 60 / 24;
                    const y = index * (cellHeight + cellMargin);
                    const pageRect = new Rect(beforeStart, y, during, cellHeight);
                    const pathView = new SkyPathView(new Rect(beforeStart, y, during, cellHeight));
                    canvasView.pageView.push(pathView);
                    const textView = new SkyTextView(pageRect, booking.id);
                    canvasView.pageView.push(textView);
                });
                index++;
            });
        }
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

    private render() {
        this.createSkSurfaceAndCanvas();
        if (!this.skSurface) return;
        this.skCanvas.clear(sk.CanvasKit.TRANSPARENT);
        this.skCanvas.save();
        this.skCanvas.scale(this.dpi, this.dpi);
        this.pageView?.render();
        this.skCanvas.restore();
        this.skSurface.flush();
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
}
