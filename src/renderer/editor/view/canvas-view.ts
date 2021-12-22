import {Canvas, FontMgr, Surface} from "canvaskit-wasm";
import sk, {Color, fontMgr} from "../utils/canvas-kit";
import {Rect} from "../base/rect";
import {Page} from "./page";
import {Point} from "../base/point";
import {FrameLayer, ShapeLayer} from "../layer";

export class CanvasView {
    static currentContext: CanvasView;

    canvasEl: HTMLCanvasElement

    skSurface!: Surface;
    skCanvas!: Canvas;
    fontMgr!: FontMgr;

    pages: Page[] = [];

    currentPage: Page;

    scale: number = 1;
    offset: Point = new Point(0, 0);

    constructor(canvasEl: HTMLCanvasElement) {
        this.canvasEl = canvasEl;
        this.reSize();

        this.skSurface = sk.CanvasKit.MakeCanvasSurface(this.canvasEl)!;
        this.skCanvas = this.skSurface.getCanvas();

        this.fontMgr = fontMgr;
        CanvasView.currentContext = this;

        this.initSchedule();

        const page = new Page();
        const layer = new FrameLayer(new Rect(40, 50, 1080, 720));
        layer.fillColor = Color.PURE_BLACK;
        const layer2 = new ShapeLayer(new Rect(200, 150, 750, 500));
        layer2.fillColor = Color.BLUEISH_BLACK;
        page.appendLayer(layer);
        page.appendLayer(layer2);
        this.appendPage(page);
        this.currentPage = this.pages[0];

        this.blingEvent();
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
        this.canvasEl.addEventListener("mousemove", (e) => {
            const bounds = this.canvasEl.getBoundingClientRect();
            this.currentPage.layers.forEach((layer) => {
                const isXInCanvas = (e.clientX >= (bounds.left + layer.rect.left) && e.clientX <= (bounds.left + layer.rect.right));
                const isYInCanvas = (e.clientY >= (bounds.top + layer.rect.top) && e.clientY <= (bounds.top + layer.rect.bottom));
                layer.isHovered = isXInCanvas && isYInCanvas;
            })
        })
        this.canvasEl.addEventListener("mouseleave", (e) => {
            this.currentPage.layers.forEach((layer) => {
                layer.isHovered = false;
            })
        })
        this.canvasEl.addEventListener("wheel", (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                e.stopPropagation();
                const positionX = e.offsetX;
                const positionY = e.offsetY;
                console.log(e);
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
