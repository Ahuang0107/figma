import sk, {Color, ParagraphFactory} from "../utils/canvas-kit";
import {BaseLayer} from "./base-layer";
import {Rect} from "../base/rect";
import {Paragraph} from "@skeditor/canvaskit-wasm";

type ParaPaintInfo = { baseY: number; paraArr: [Paragraph, number][] };

export class TextLayer extends BaseLayer {
    _painter?: TextPainter;

    constructor(
        rect: Rect,
        public text: string,
        public fontSize: number = 20,
        public fillColor: Float32Array = Color.WHITE,
    ) {
        super(rect);
        this.type = "TextLayer";
    }

    private get painter() {
        if (!this._painter) {
            this._painter = new TextPainter(this);
        }
        return this._painter;
    }

    render() {
        this.painter.paint();
    }
}

class TextPainter {
    constructor(private layer: TextLayer) {
    }

    private _cachePaintInfo?: ParaPaintInfo;

    get cachePaintInfo(): ParaPaintInfo {
        if (!this._cachePaintInfo) {
            this._cachePaintInfo = this.buildPaintInfo();
        }
        return this._cachePaintInfo;
    }

    paint() {
        this.paintWith(this.cachePaintInfo);
    }

    private buildPaintInfo(): ParaPaintInfo {
        const lines = this.layer.text.split(/\r\n|\r|\n/);
        let curY = 0;
        const paraArr = lines.map((line, idx) => {
            const paraStyle = new sk.CanvasKit.ParagraphStyle({
                textStyle: {
                    color: this.layer.fillColor,
                    fontFamilies: ['Roboto'],
                    fontSize: this.layer.fontSize * this.layer.ctx.scale,
                },
                textAlign: sk.CanvasKit.TextAlign.Left,
                maxLines: 1,
                ellipsis: '...',
            });
            const builder = ParagraphFactory.createParagraph(paraStyle);
            builder.addText(line);
            builder.pop();
            const para = builder.build();
            builder.delete();
            para.layout(this.layer.rect.width * this.layer.ctx.scale);
            const ret = [para, curY] as [Paragraph, number];
            curY += para.getHeight();
            return ret;
        });
        return {
            baseY: this.layer.rect.y,
            paraArr,
        };
    }

    private paintWith(paintInfo: ParaPaintInfo | undefined) {
        const {paraArr, baseY} = paintInfo;
        const {skCanvas} = this.layer.ctx;
        paraArr.forEach(([para, y]) => {
            skCanvas.drawParagraph(para, this.layer.rect.x + this.layer.ctx.transform.x, y + baseY + this.layer.ctx.transform.y);
        });
    }
}
