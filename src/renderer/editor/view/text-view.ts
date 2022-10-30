import {SkyBaseView} from "./base-view";
import {Paragraph} from "@skeditor/canvaskit-wasm";
import {Rect} from "../base/rect";
import sk, {defaultFonts} from "../utils/canvas-kit";

export class SkyTextView extends SkyBaseView {
    constructor(
        readonly rect: Rect,
        readonly text: string,
        readonly fontSize: number = 10,
        readonly fillColor: Float32Array = sk.CanvasKit.WHITE
    ) {
        super();
    }

    _painter?: TextPainter;

    private get painter() {
        if (!this._painter) {
            this._painter = new TextPainter(this);
        }
        return this._painter;
    }

    render(): void {
        this.painter.paint();
    }
}

type ParaPaintInfo = { baseY: number; paraArr: [Paragraph, number][] };

class TextPainter {
    constructor(private view: SkyTextView) {
    }

    private _cachePaintInfo?: ParaPaintInfo;

    get cachePaintInfo() {
        if (!this._cachePaintInfo) {
            this._cachePaintInfo = this.buildPaintInfo();
        }
        return this._cachePaintInfo;
    }

    paint() {
        this.paintWith(this.cachePaintInfo);
    }

    private buildPaintInfo(): ParaPaintInfo {
        const {fontProvider} = this.view.ctx;
        const {text} = this.view;

        const lines = text.split(/\r\n|\r|\n/);
        let curY = 0;
        const paraArr = lines.map((line) => {
            const paraStyle = new sk.CanvasKit.ParagraphStyle({
                textStyle: {
                    color: this.view.fillColor,
                    fontFamilies: defaultFonts,
                    fontSize: this.view.fontSize,
                },
                textAlign: sk.CanvasKit.TextAlign.Left,
                maxLines: 1,
                ellipsis: '...',
            });
            const builder = sk.CanvasKit.ParagraphBuilder.MakeFromFontProvider(paraStyle, fontProvider);
            builder.addText(line);
            builder.pop();
            const para = builder.build();
            builder.delete();
            para.layout(this.view.rect.width);
            const ret = [para, curY] as [Paragraph, number];
            curY += para.getHeight();
            return ret;
        });
        return {
            baseY: this.view.rect.y,
            paraArr,
        };
    }

    private paintWith(paintInfo: ParaPaintInfo | undefined) {
        if (!paintInfo) return;
        const {paraArr, baseY} = paintInfo;
        const {skCanvas} = this.view.ctx;

        paraArr.forEach(([para, y]) => {
            skCanvas.drawParagraph(para, this.view.rect.x, y + baseY);
        });
    }
}
