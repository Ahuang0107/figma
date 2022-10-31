import {Color, Paint} from "@skeditor/canvaskit-wasm";
import sk from "../utils/canvas-kit";
import {Rect} from "../base/rect";
import {SkyBaseLayerView} from "./base-layer-view";

export class SkyLineView extends SkyBaseLayerView {
    constructor(
        readonly rect: Rect,
        readonly fillColor: Color = sk.CanvasKit.TRANSPARENT
    ) {
        super();
    }

    _painter?: LintPainter;

    private get painter() {
        if (!this._painter) {
            this._painter = new LintPainter(this);
        }
        return this._painter;
    }

    _render(): void {
        this.painter.paint();
    }
}

type LintPaintInfo = { rect: Rect; paint: Paint };

export class LintPainter {
    constructor(private view: SkyLineView) {
    }

    private _cachePaintInfo?: LintPaintInfo;

    get cachePaintInfo() {
        if (!this._cachePaintInfo) {
            this._cachePaintInfo = this.buildPaintInfo();
        }
        return this._cachePaintInfo;
    }

    paint() {
        this.paintWith(this.cachePaintInfo);
    }

    private buildPaintInfo(): LintPaintInfo {
        const {rect, fillColor} = this.view;
        const paint = new sk.CanvasKit.Paint();
        paint.setColor(fillColor);
        return {
            rect,
            paint,
        };
    }

    private paintWith(paintInfo: LintPaintInfo | undefined) {
        if (!paintInfo) return;
        const {rect, paint} = paintInfo;
        const {skCanvas} = this.view.ctx;

        skCanvas.drawLine(rect.x, rect.y, rect.x + rect.width, rect.y + rect.height, paint);
    }
}
