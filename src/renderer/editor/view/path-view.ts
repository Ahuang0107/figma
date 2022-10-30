import {Paint} from "@skeditor/canvaskit-wasm";
import {SkyBaseView} from "./base-view";
import {Rect} from "../base/rect";
import sk from "../utils/canvas-kit";

type RectPaintInfo = { rect: Float32Array; paint: Paint };

export class SkyPathView extends SkyBaseView {
    constructor(
        readonly rect: Rect,
        readonly fillColor: Float32Array = sk.CanvasKit.BLACK
    ) {
        super();
    }

    private _cachePaintInfo?: RectPaintInfo;

    get cachePaintInfo() {
        if (!this._cachePaintInfo) {
            this._cachePaintInfo = this.buildPaintInfo();
        }
        return this._cachePaintInfo;
    }

    render(): void {
        const {rect, paint} = this.cachePaintInfo;
        this.ctx.skCanvas.drawRect(rect, paint);
    }

    private buildPaintInfo(): RectPaintInfo {
        const fillPaint = new sk.CanvasKit.Paint();
        fillPaint.setColor(this.fillColor);
        fillPaint.setStyle(sk.CanvasKit.PaintStyle.Fill);
        const rect = sk.CanvasKit.XYWHRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        return {
            rect, paint: fillPaint
        }
    }
}
