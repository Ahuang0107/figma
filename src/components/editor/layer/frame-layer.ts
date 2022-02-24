import sk, {Color} from "../utils/canvas-kit";
import {BaseLayer} from "./base-layer";
import {Rect} from "../base/rect";

export class FrameLayer extends BaseLayer {

    fillColor: Float32Array = Color.WHITE;

    constructor(rect: Rect) {
        super(rect);
    }

    render() {

        const fillPaint = new sk.CanvasKit.Paint();
        fillPaint.setColor(this.fillColor);
        fillPaint.setStyle(sk.CanvasKit.PaintStyle.Fill);

        this.ctx.skCanvas.drawRect(this.rect.toRect(), fillPaint);
    }
}
