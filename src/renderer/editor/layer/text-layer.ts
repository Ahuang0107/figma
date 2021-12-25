import sk, {Color, ParagraphFactory} from "../utils/canvas-kit";
import {BaseLayer} from "./base-layer";
import {Rect} from "../base/rect";
import {CanvasView} from "../view/canvas-view";

export class TextLayer extends BaseLayer {
    DEFAULT_FONT_SIZE = 28;

    constructor(rect: Rect, public text: string, public fillColor: Float32Array = Color.WHITE) {
        super(rect);
    }

    render() {
        const {scale} = CanvasView.currentContext;

        const paraStyle = new sk.CanvasKit.ParagraphStyle({
            textStyle: {
                color: this.fillColor,
                fontSize: this.DEFAULT_FONT_SIZE * scale,
            }
        });
        const builder = ParagraphFactory.createParagraph(paraStyle);
        builder.addText(this.text);
        builder.pop();
        const paragraph = builder.build();
        paragraph.layout(this.rect.width * scale);
        if (this.isHovered) {

        }
        this.ctx.skCanvas.drawParagraph(paragraph, this.rect.x * scale, this.rect.y * scale);
    }
}
