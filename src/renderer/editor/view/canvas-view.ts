import {Canvas, GrDirectContext, Surface, TypefaceFontProvider} from "@skeditor/canvaskit-wasm";
import {CanvasKitPromised, getFontProvider} from "../utils";
import {BehaviorSubject, debounceTime, Observable} from "rxjs";
import sk from "../utils/canvas-kit";
import {Rect} from "../base/rect";
import {Disposable} from "../base/disposable";
import invariant from "ts-invariant";
import {SkyPageView} from "./page-view";
import {SkyRectView} from "./rect-view";
import {bookings, staffs} from "../../../client";
import {SkyTextView} from "./text-view";

export class CanvasView extends Disposable {
    static currentContext: CanvasView;
    canvasEl$ = new BehaviorSubject<HTMLCanvasElement | undefined>(undefined);
    private grContext!: GrDirectContext;
    private skSurface!: Surface;
    skCanvas!: Canvas;
    fontProvider!: TypefaceFontProvider;

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
        canvasView.pageView = new SkyPageView();
        {
            /* todo 这里是mock data的部分，之后再删除
            *   目前需要做的是，一遍把渲染逻辑根据sk-editor完善，
            *   一边考虑如何做到高效的渲染retain的booking界面
            *   比如把左侧的渲染和上方的渲染都分出来，这样就有三个渲染页面
            *   左侧和中间的y轴移动同步，上方和中间的x轴移动同步
            *   同时还要考虑到点击交互，点击时判断点击点相对画布视窗的坐标，画布的世界坐标，以及对应目前显示的数据
            *   另外一个问题是，当不显示周末列的功能要如何实现呢？生成画面元素的时候就要把每周末的时间考虑进去，然后算坐标时去掉？
            *   这样看周末和不看周末的视图是不是也要分成两个page
            *   按照月，按照周，按照日的也都要分成不同的page
            *   那也就是page之外的渲染逻辑 */
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
                    const pathView = new SkyRectView(pageRect, sk.CanvasKit.Color(47, 47, 47), 3);
                    canvasView.pageView.push(pathView);
                    const textView = new SkyTextView(pageRect, booking.id);
                    canvasView.pageView.push(textView);
                });
                index++;
            });
        }
        console.log("start")
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
