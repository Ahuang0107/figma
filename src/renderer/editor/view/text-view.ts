import {Font, Paint} from "@skeditor/canvaskit-wasm";
import {Rect} from "../base/rect";
import sk from "../utils/canvas-kit";
import {SkyBaseLayerView} from "./base-layer-view";
import {Point} from "../base/point";

export class SkyTextView extends SkyBaseLayerView {
    constructor(
        readonly rect: Rect,
        readonly text: string,
        readonly fontSize: number = 10,
        readonly fillColor: Float32Array = sk.CanvasKit.WHITE
    ) {
        super(rect);
    }

    _painter?: TextPainter;

    private get painter() {
        if (!this._painter) {
            this._painter = new TextPainter(this);
        }
        return this._painter;
    }

    _render(): void {
        this.painter.paint();
    }
}

type TextPaintInfo = { text: string, position: Point; paint: Paint, font: Font };

class TextPainter {
    constructor(private view: SkyTextView) {
    }

    private _cachePaintInfo?: TextPaintInfo;

    get cachePaintInfo() {
        if (!this._cachePaintInfo) {
            this._cachePaintInfo = this.buildPaintInfo();
        }
        return this._cachePaintInfo;
    }

    paint() {
        this.paintWith(this.cachePaintInfo);
    }

    private buildPaintInfo(): TextPaintInfo {
        const {rect, text, fontSize, fillColor} = this.view;
        const paint = new sk.CanvasKit.Paint();
        paint.setColor(fillColor);
        paint.setAntiAlias(true);
        const font = new sk.CanvasKit.Font();
        font.setSize(fontSize);
        return {
            text,
            position: rect.leftTop,
            paint,
            font,
        };
    }

    private paintWith(paintInfo: TextPaintInfo | undefined) {
        if (!paintInfo) return;
        const {text, position, paint, font} = paintInfo;
        const {skCanvas} = this.view.ctx;

        skCanvas.drawText(text, position.x, position.y, paint, font);
    }
}
