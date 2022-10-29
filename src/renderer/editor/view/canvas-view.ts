import {Canvas, Surface} from "@skeditor/canvaskit-wasm";
import sk, {Color} from "../utils/canvas-kit";
import {Page} from "./page";
import {fromEvent, Observable, Subscription} from "rxjs";
import {Point} from "../base/point";
import {DrawFactory, ShapeDrawer} from "../draw/draw-factory";

// import engageRes from "../../../assets/data/engage.json";

export class CanvasView {
    static currentContext: CanvasView;

    canvasEl: HTMLCanvasElement;

    skSurface!: Surface;
    skCanvas!: Canvas;

    pages: Page[] = [];

    currentPage: Page;

    scale: number = 1;

    transform: Point = new Point();

    mousedownEvent: Observable<MouseEvent>;
    mouseupEvent: Observable<MouseEvent>;
    mousemoveEvent: Observable<MouseEvent>;
    mouseleaveEvent: Observable<MouseEvent>;
    wheelEvent: Observable<WheelEvent>;

    drawing: ShapeDrawer | null = null;
    drawingSubscription: Subscription | null = null;

    isHoveredLayerId: number | null = null;

    constructor(canvasEl: HTMLCanvasElement) {
        CanvasView.currentContext = this;
        this.canvasEl = canvasEl;
        this.reSize();

        const ctx = sk.CanvasKit.GetWebGLContext(this.canvasEl);
        const grCtx = sk.CanvasKit.MakeGrContext(ctx);
        this.skSurface = sk.CanvasKit.MakeOnScreenGLSurface(grCtx, this.canvasEl.width, this.canvasEl.height, sk.CanvasKit.ColorSpace.SRGB)!;
        this.skCanvas = this.skSurface.getCanvas();

        this.initEvent();
        this.blingEvent();

        this.startTick();
    }

    render() {
        this.skCanvas.clear(Color.GREY);
        this.skCanvas.save();
        this.currentPage?.render();
        this.skCanvas.restore();
        this.skSurface.flush();
    }

    reSize() {
        const foreignEl = this.canvasEl.parentElement;
        const bounds = foreignEl.getBoundingClientRect();
        this.canvasEl.width = bounds.width;
        this.canvasEl.height = bounds.height;
    }

    initEvent() {
        this.mousedownEvent = fromEvent<MouseEvent>(this.canvasEl, "mousedown");
        this.mouseupEvent = fromEvent<MouseEvent>(this.canvasEl, "mouseup");
        this.mousemoveEvent = fromEvent<MouseEvent>(this.canvasEl, "mousemove");
        this.mouseleaveEvent = fromEvent<MouseEvent>(this.canvasEl, "mouseleave");
        this.wheelEvent = fromEvent<WheelEvent>(this.canvasEl, "wheel");
    }

    blingEvent() {
        this.wheelEvent.subscribe((e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                e.stopPropagation();
                // if (e.deltaY > 0) {
                //     this.transform.y -= 5;
                // } else {
                //     this.transform.y += 5;
                // }
                if (e.deltaX > 0) {
                    this.transform.x -= 5;
                } else {
                    this.transform.x += 5;
                }
            }
        })
        this.mousedownEvent.subscribe((e) => {
            this.drawing = DrawFactory.create(new Point(e.offsetX, e.offsetY));
            this.currentPage.layers.push(this.drawing.toLayer());
            this.drawingSubscription =
                this.mousemoveEvent.subscribe((e) => {
                    this.drawing.updateSize(new Point(e.offsetX, e.offsetY));
                    this.currentPage.layers.pop();
                    this.currentPage.layers.push(this.drawing.toLayer());
                });
        });
        this.mouseupEvent.subscribe((e) => {
            this.drawing = null;
            if (this.drawingSubscription) {
                this.drawingSubscription.unsubscribe();
            }
        });
        this.mouseleaveEvent.subscribe((e) => {
            if (this.drawing != null) {
                this.currentPage.layers.pop();
                this.drawing = null;
            }
            if (this.drawingSubscription) {
                this.drawingSubscription.unsubscribe();
            }
        })
    }

    private startTick() {
        const handler = () => {
            this.render();
            setTimeout(handler, 16);
        };
        setTimeout(handler, 16);
    }

    appendPage(page: Page) {
        this.pages.push(page);
    }

    updatePage(index: number, page: Page) {
        this.pages[index] = page;
        this.currentPage = this.pages[index];
    }
}
