import {Canvas, FontMgr, Surface} from "canvaskit-wasm";
import sk, {Color, fontMgr} from "../utils/canvas-kit";
import {Rect} from "../base/rect";
import {Page} from "./page";
import {Layer} from "./layer";

export class CanvasView {
    static currentContext: CanvasView;

    canvasEl: HTMLCanvasElement

    skSurface!: Surface;
    skCanvas!: Canvas;
    fontMgr!: FontMgr;

    pages: Page[] = [];

    currentPage: Page;

    constructor(canvasEl: HTMLCanvasElement) {
        this.canvasEl = canvasEl;
        this.reSize();

        this.skSurface = sk.CanvasKit.MakeCanvasSurface(this.canvasEl)!;
        this.skCanvas = this.skSurface.getCanvas();

        this.fontMgr = fontMgr;
        CanvasView.currentContext = this;

        this.initSchedule();

        const page = new Page();
        const layer = new Layer(new Rect(40, 50, 300, 500));
        const layer2 = new Layer(new Rect(400, 50, 300, 500));
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
