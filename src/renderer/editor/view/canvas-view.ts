import {Canvas, Surface} from "canvaskit-wasm";
import sk, {Color} from "../utils/canvas-kit";
import {Rect} from "../base/rect";
import {Page} from "./page";
import {ShapeLayer, TextLayer} from "../layer";
import {fromEvent, Observable, Subscription} from "rxjs";
import {Point} from "../base/point";
import {DrawFactory, ShapeDrawer} from "../draw/draw-factory";
import bookings from "../../../assets/data/booking.json";

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
        this.canvasEl = canvasEl;
        this.reSize();

        this.skSurface = sk.CanvasKit.MakeCanvasSurface(this.canvasEl)!;
        this.skCanvas = this.skSurface.getCanvas();

        CanvasView.currentContext = this;
        this.initEvent();
        this.blingEvent();

        this.initSchedule();

        this.mockData();
    }

    mockData() {
        const page = new Page();

        const origin = 1666659600000;
        const scaleX = 30;

        bookings.forEach((booking, index) => {
            booking.bookings.forEach((bks) => {
                const beforeStart = scaleX * (bks.startTime - origin) / 1000 / 60 / 60 / 24;
                const during = scaleX * (bks.endTime - bks.startTime) / 1000 / 60 / 60 / 24;
                const columnLayer = new ShapeLayer(new Rect(beforeStart, index * 40, during, 30));
                const titleLayer = new TextLayer(new Rect(beforeStart + 5, index * 40 + 18, during, 30), "Sales Dynamics", 10);
                page.appendLayer(titleLayer);
                columnLayer.fillColor = sk.CanvasKit.Color(5, 5, 15, 0.37);
                page.appendLayer(columnLayer);
            })
        })

        this.appendPage(page);
        this.currentPage = this.pages[0];
    }

    render() {
        this.skCanvas.clear(Color.GREY);
        this.currentPage.render();
        // this.skSurface.flush();
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

    // create schedule render task
    private initSchedule() {
        const renderSchedule = () => {
            this.skSurface.requestAnimationFrame(renderSchedule);
            this.render();
        };
        this.skSurface.requestAnimationFrame(renderSchedule);
    }

    appendPage(page: Page) {
        this.pages.push(page);
    }
}
