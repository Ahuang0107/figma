import {Canvas, FontMgr, Surface} from "canvaskit-wasm";
import sk, {fontMgr} from "../utils/canvas-kit";
import {Rect} from "../base/rect";

export class CanvasView {
    static currentContext: CanvasView;

    canvasEl: HTMLCanvasElement

    skSurface!: Surface;
    skCanvas!: Canvas;
    fontMgr!: FontMgr;

    constructor(canvasEl: HTMLCanvasElement) {
        this.canvasEl = canvasEl;
        this.reSize();

        this.skSurface = sk.CanvasKit.MakeCanvasSurface(this.canvasEl)!;
        this.skCanvas = this.skSurface.getCanvas();

        this.fontMgr = fontMgr;
        CanvasView.currentContext = this;

        this.initSchedule();
    }

    render() {
        this.skCanvas.clear(sk.CanvasKit.Color(229, 229, 229));
        const rect = new Rect(40, 50, 300, 500);
        const fillPaint = new sk.CanvasKit.Paint();
        fillPaint.setColor(sk.CanvasKit.Color(255, 255, 255));
        fillPaint.setStyle(sk.CanvasKit.PaintStyle.Fill);

        const strokePaint = new sk.CanvasKit.Paint();
        strokePaint.setColor(sk.CanvasKit.Color(24, 160, 251));
        strokePaint.setStyle(sk.CanvasKit.PaintStyle.Stroke);
        strokePaint.setStrokeWidth(1);

        const skRect = rect.toSk();
        this.skCanvas.drawRect(skRect, fillPaint);
        this.skSurface.flush();
    }

    reSize() {
        const foreignEl = this.canvasEl.parentElement;
        const bounds = foreignEl.getBoundingClientRect();
        this.canvasEl.width = bounds.width;
        this.canvasEl.height = bounds.height;
    }

    addListener() {
        this.canvasEl.addEventListener("mousemove", (e) => {
        })
        this.canvasEl.addEventListener("mouseleave", (e) => {
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
}
