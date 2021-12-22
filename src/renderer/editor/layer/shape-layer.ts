import sk, {Color} from "../utils/canvas-kit";
import {BaseLayer} from "./base-layer";
import {Rect} from "../base/rect";

export class ShapeLayer extends BaseLayer {
    isHovered: boolean = false;

    fillColor: Float32Array = Color.WHITE;
    strokeColor: Float32Array = Color.BLUE;

    constructor(rect: Rect) {
        super(rect);
    }

    render() {
        const fillPaint = new sk.CanvasKit.Paint();
        fillPaint.setColor(this.fillColor);
        fillPaint.setStyle(sk.CanvasKit.PaintStyle.Fill);
        const strokePaint = new sk.CanvasKit.Paint();
        strokePaint.setColor(this.strokeColor);
        strokePaint.setStyle(sk.CanvasKit.PaintStyle.Stroke);
        strokePaint.setStrokeWidth(1);
        const rRect = sk.CanvasKit.RRectXY(this.rect.toSk(), 50, 50);
        if (this.isHovered) {
            this.ctx.skCanvas.drawRRect(rRect, fillPaint);
            this.ctx.skCanvas.drawRect(rRect, strokePaint);
        } else {
            this.ctx.skCanvas.drawRRect(rRect, fillPaint);
        }
    }
}
