import sk, {Color} from "../utils/canvas-kit";
import {BaseLayer} from "./base-layer";
import {Rect} from "../base/rect";
import {CanvasView} from "../view/canvas-view";

export class TextLayer extends BaseLayer {

    constructor(
        rect: Rect,
        public text: string,
        public fontSize: number = 20,
        public fillColor: Float32Array = Color.WHITE,
    ) {
        super(rect);
    }

    render() {
        const {scale} = CanvasView.currentContext;

        if (this.isHovered) {

        }
        const font = new sk.CanvasKit.Font(null, this.fontSize);
        const fontPaint = new sk.CanvasKit.Paint();
        fontPaint.setColor(this.fillColor);
        fontPaint.setStyle(sk.CanvasKit.PaintStyle.Fill);
        fontPaint.setAntiAlias(true);
        this.ctx.skCanvas.drawText(this.text, this.rect.x * scale, this.rect.y * scale, fontPaint, font);
    }
}
