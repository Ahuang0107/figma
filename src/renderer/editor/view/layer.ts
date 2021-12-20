import {Rect} from "../base/rect";
import {CanvasView} from "./canvas-view";
import sk, {Color} from "../utils/canvas-kit";

export class Layer {
    rotation: number = 0;

    ctx: CanvasView;
    isHovered: boolean = false;

    constructor(public rect: Rect) {

        this.ctx = CanvasView.currentContext;
    }

    render() {
        const fillPaint = new sk.CanvasKit.Paint();
        fillPaint.setColor(Color.WHITE);
        fillPaint.setStyle(sk.CanvasKit.PaintStyle.Fill);
        const strokePaint = new sk.CanvasKit.Paint();
        strokePaint.setColor(Color.BLUE);
        strokePaint.setStyle(sk.CanvasKit.PaintStyle.Stroke);
        strokePaint.setStrokeWidth(1);
        if (this.isHovered) {
            this.ctx.skCanvas.drawRect(this.rect.toSk(), fillPaint);
            this.ctx.skCanvas.drawRect(this.rect.toSk(), strokePaint);
        } else {
            this.ctx.skCanvas.drawRect(this.rect.toSk(), fillPaint);
        }
    }
}
