import sk, {Color, ParagraphFactory} from "../utils/canvas-kit";
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
        this.type = "TextLayer";
    }

    render() {
        const {scale} = CanvasView.currentContext;

        const paraStyle = new sk.CanvasKit.ParagraphStyle({
            textStyle: {
                color: this.fillColor,
                fontFamilies: ['Roboto'],
                fontSize: this.fontSize * scale,
            },
            textAlign: sk.CanvasKit.TextAlign.Left,
            maxLines: 1,
            ellipsis: '...',
        });
        const builder = ParagraphFactory.createParagraph(paraStyle);
        builder.addText(this.text);
        const paragraph = builder.build();
        // todo issue [Uncaught RuntimeError: abort(undefined).]
        paragraph.layout(this.rect.width * scale);
        if (this.isHovered) {

        }
        this.ctx.skCanvas.drawParagraph(paragraph, this.rect.x * scale, this.rect.y * scale);
    }
}
