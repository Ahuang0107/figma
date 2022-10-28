import {Canvas, Surface} from "@skeditor/canvaskit-wasm";
import sk, {Color} from "../utils/canvas-kit";
import {Rect} from "../base/rect";
import {Page} from "./page";
import {ShapeLayer, TextLayer} from "../layer";
import {fromEvent, Observable, Subscription} from "rxjs";
import {Point} from "../base/point";
import {DrawFactory, ShapeDrawer} from "../draw/draw-factory";
import staffRes from "../../../assets/data/staff.json";
import bookingRes from "../../../assets/data/booking.json";

// import engageRes from "../../../assets/data/engage.json";

export class CanvasView {
    static currentContext: CanvasView;

    canvasEl: HTMLCanvasElement;

    skSurface!: Surface;
    skCanvas!: Canvas;

    pages: Page[] = [];

    currentPage: Page;

    scale: number = 1;

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

        this.mockData();
    }

    mockData() {
        const page = new Page();

        const origin = 1666659600000;
        const scaleX = 25;
        const cellHeight = 20;
        const cellMargin = 5;
        const fontSize = 12;

        let index = 0;
        staffRes.data.forEach(staff => {
            // @ts-ignore
            bookingRes.data[staff.id]?.forEach(booking => {
                const beforeStart = scaleX * (booking.startTime - origin) / 1000 / 60 / 60 / 24;
                const during = scaleX * (booking.endTime - booking.startTime) / 1000 / 60 / 60 / 24;
                const y = index * (cellHeight + cellMargin);
                // const engage = engageRes.data.find((value) => value.id == booking.engagementCodeId);

                if (beforeStart <= this.canvasEl.width && y <= this.canvasEl.height && beforeStart >= 0 && y >= 0) {
                    const columnLayer = new ShapeLayer(new Rect(beforeStart, y, during, cellHeight));
                    const titleLayer = new TextLayer(new Rect(beforeStart, y, during, cellHeight), booking.id, fontSize);
                    page.appendLayer(titleLayer);
                    columnLayer.fillColor = sk.CanvasKit.Color(5, 5, 15, 0.37);
                    page.appendLayer(columnLayer);
                }
            });
            index++;
        });

        this.appendPage(page);
        this.currentPage = this.pages[0];
    }

    render() {
        this.skCanvas.clear(Color.GREY);
        this.skCanvas.save();
        this.currentPage.render();
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
                if (e.deltaY > 0) {
                    this.scale += 0.01;
                } else {
                    this.scale -= 0.01;
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
}
