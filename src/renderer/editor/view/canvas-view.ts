import {Canvas, FontMgr, Surface} from "canvaskit-wasm";
import sk, {Color, fontMgr} from "../utils/canvas-kit";
import {Rect} from "../base/rect";
import {Page} from "./page";
import {FrameLayer, ShapeLayer, TextLayer} from "../layer";
import {fromEvent, Observable} from "rxjs";

export class CanvasView {
    static currentContext: CanvasView;

    canvasEl: HTMLCanvasElement

    skSurface!: Surface;
    skCanvas!: Canvas;
    fontMgr!: FontMgr;

    pages: Page[] = [];

    currentPage: Page;

    scale: number = 1;

    mousemoveEvent: Observable<MouseEvent>;
    mouseleaveEvent: Observable<MouseEvent>;
    wheelEvent: Observable<WheelEvent>;

    isHoveredLayerId: number | null = null;

    constructor(canvasEl: HTMLCanvasElement) {
        this.canvasEl = canvasEl;
        this.reSize();

        this.skSurface = sk.CanvasKit.MakeCanvasSurface(this.canvasEl)!;
        this.skCanvas = this.skSurface.getCanvas();

        this.fontMgr = fontMgr;
        CanvasView.currentContext = this;
        this.blingEvent();

        this.initSchedule();

        this.mockData();
    }

    mockData() {
        const page = new Page();

        const frameLayer = new FrameLayer(new Rect(40, 50, 1080, 720));
        frameLayer.fillColor = Color.PURE_BLACK;
        page.appendLayer(frameLayer);

        const widgetLayer = new ShapeLayer(new Rect(150, 250, 856, 363), 10);
        widgetLayer.fillColor = Color.BLUEISH_BLACK;
        page.appendLayer(widgetLayer);

        const column1Layer = new ShapeLayer(new Rect(248, 325, 65, 234));
        column1Layer.fillColor = sk.CanvasKit.Color(5, 5, 15, 0.37);
        page.appendLayer(column1Layer);
        const column2Layer = new ShapeLayer(new Rect(378, 325, 65, 234));
        column2Layer.fillColor = sk.CanvasKit.Color(5, 5, 15, 0.37);
        page.appendLayer(column2Layer);
        const column3Layer = new ShapeLayer(new Rect(508, 325, 65, 234));
        column3Layer.fillColor = sk.CanvasKit.Color(5, 5, 15, 0.37);
        page.appendLayer(column3Layer);
        const column4Layer = new ShapeLayer(new Rect(638, 325, 65, 234));
        column4Layer.fillColor = sk.CanvasKit.Color(5, 5, 15, 0.37);
        page.appendLayer(column4Layer);
        const column5Layer = new ShapeLayer(new Rect(768, 325, 65, 234));
        column5Layer.fillColor = sk.CanvasKit.Color(5, 5, 15, 0.37);
        page.appendLayer(column5Layer);
        const column6Layer = new ShapeLayer(new Rect(898, 325, 65, 234));
        column6Layer.fillColor = sk.CanvasKit.Color(5, 5, 15, 0.37);
        page.appendLayer(column6Layer);

        const titleLayer = new TextLayer(new Rect(182, 270, 150, 32), "Sales Dynamics");
        page.appendLayer(titleLayer);

        const value1Layer = new TextLayer(new Rect(206, 543, 40, 24), "0", 16, Color.GREY);
        page.appendLayer(value1Layer);
        const value2Layer = new TextLayer(new Rect(182, 499, 40, 24), "$200", 16, Color.GREY);
        page.appendLayer(value2Layer);
        const value3Layer = new TextLayer(new Rect(182, 455, 40, 24), "$200", 16, Color.GREY);
        page.appendLayer(value3Layer);
        const value4Layer = new TextLayer(new Rect(182, 411, 40, 24), "$400", 16, Color.GREY);
        page.appendLayer(value4Layer);
        const value5Layer = new TextLayer(new Rect(182, 367, 40, 24), "$800", 16, Color.GREY);
        page.appendLayer(value5Layer);
        const value6Layer = new TextLayer(new Rect(178, 323, 48, 24), "$1000", 16, Color.GREY);
        page.appendLayer(value6Layer);

        this.appendPage(page);
        this.currentPage = this.pages[0];
    }

    render() {
        this.skCanvas.clear(Color.GREY);
        this.currentPage.render();
        this.skSurface.flush();
    }

    reSize() {
        const foreignEl = this.canvasEl.parentElement;
        const bounds = foreignEl.getBoundingClientRect();
        this.canvasEl.width = bounds.width;
        this.canvasEl.height = bounds.height;
    }

    blingEvent() {
        this.mousemoveEvent = fromEvent<MouseEvent>(this.canvasEl, "mousemove");
        this.mouseleaveEvent = fromEvent<MouseEvent>(this.canvasEl, "mouseleave");
        this.wheelEvent = fromEvent<WheelEvent>(this.canvasEl, "wheel");
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
    }

    // create schedule render task
    private initSchedule() {
        const renderSchedule = () => {
            this.render();
            window.requestAnimationFrame(renderSchedule);
        };
        window.requestAnimationFrame(renderSchedule);
    }

    appendPage(page: Page) {
        this.pages.push(page);
    }
}
