import sk, {Color} from "../utils/canvas-kit";
import {BaseLayer} from "./base-layer";
import {Rect} from "../base/rect";

export class ShapeLayer extends BaseLayer {

    fillColor: Float32Array = Color.WHITE;

    constructor(rect: Rect, public cornerRadius: number = 0) {
        super(rect);
    }

    render() {
        const fillPaint = new sk.CanvasKit.Paint();
        fillPaint.setColor(this.fillColor);
        fillPaint.setStyle(sk.CanvasKit.PaintStyle.Fill);
        const rRect = sk.CanvasKit.RRectXY(this.rect.toRect(), this.cornerRadius, this.cornerRadius);

        this.ctx.skCanvas.drawRRect(rRect, fillPaint);
    }
}
