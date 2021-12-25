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
        const layer = new FrameLayer(new Rect(40, 50, 1080, 720));
        layer.fillColor = Color.PURE_BLACK;
        const layer2 = new ShapeLayer(new Rect(150, 250, 856, 363), 10);
        layer2.fillColor = Color.BLUEISH_BLACK;
        const textLayer = new TextLayer(new Rect(200, 300, 100, 30), "apple");
        page.appendLayer(layer);
        page.appendLayer(layer2);
        page.appendLayer(textLayer);
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
