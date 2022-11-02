import {Paragraph} from "@skeditor/canvaskit-wasm";
import {Rect} from "../base/rect";
import sk, {defaultFonts} from "../utils/canvas-kit";
import {SkyBaseLayerView} from "./base-layer-view";

export class SkyParaView extends SkyBaseLayerView {
    constructor(
        readonly rect: Rect,
        readonly text: string,
        readonly fontSize: number = 10,
        readonly fillColor: Float32Array = sk.CanvasKit.WHITE
    ) {
        super(rect);
    }

    _painter?: ParaPainter;

    private get painter() {
        if (!this._painter) {
            this._painter = new ParaPainter(this);
        }
        return this._painter;
    }

    _render(): void {
        this.painter.paint();
    }
}

type ParaPaintInfo = { baseY: number; paraArr: [Paragraph, number][] };

class ParaPainter {
    constructor(private view: SkyParaView) {
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
            // todo 这里创建太多的para一样会造成abort error，暂时不知道如何优化，
            //  但是可以再创建一个只渲染text的view，然后输入的text提前进行处理
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
