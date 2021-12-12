import {Canvas, FontMgr, Surface} from "canvaskit-wasm";
import sk, {fontMgr} from "../utils/canvas-kit";

export class SkyView {
    static currentContext: SkyView;

    canvasEl: HTMLCanvasElement

    skSurface!: Surface;
    skCanvas!: Canvas;
    fontMgr!: FontMgr;

    constructor(canvasEl: HTMLCanvasElement) {
        this.canvasEl = canvasEl;
        this.canvasEl.style.position = "absolute";
        this.canvasEl.style.zIndex = "-1000";

        // get <canvas/>'s bound and record to frame
        this.reSize()

        // create surface and canvas on <canvas/>
        this.skSurface = sk.CanvasKit.MakeCanvasSurface(this.canvasEl)!;
        this.skCanvas = this.skSurface.getCanvas();

        // create schedule render task
        // const renderSchedule = () => {
        //     window.requestAnimationFrame(renderSchedule);
        // };
        // window.requestAnimationFrame(renderSchedule);

        this.fontMgr = fontMgr;
        SkyView.currentContext = this;
    }

    reSize() {
        const foreignEl = this.canvasEl.parentElement;
        const bounds = foreignEl.getBoundingClientRect();
        this.canvasEl.width = bounds.width;
        this.canvasEl.height = bounds.height;
    }
}
