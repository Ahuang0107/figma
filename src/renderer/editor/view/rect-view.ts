import {Color, Paint} from "@skeditor/canvaskit-wasm";
import sk from "../utils/canvas-kit";
import {Rect} from "../base/rect";
import {SkyBaseLayerView} from "./base-layer-view";

export class SkyRectView extends SkyBaseLayerView {
    constructor(
        readonly rect: Rect,
        readonly fillColor: Color = sk.CanvasKit.TRANSPARENT,
        readonly radius: number = 0
    ) {
        super();
    }

    _painter?: RectPainter;

    private get painter() {
        if (!this._painter) {
            this._painter = new RectPainter(this);
        }
        return this._painter;
    }

    _render(): void {
        this.painter.paint();
    }
}

type RectPaintInfo = { rect: Float32Array; paint: Paint };

export class RectPainter {
    constructor(private view: SkyRectView) {
    }

    private _cachePaintInfo?: RectPaintInfo;

    get cachePaintInfo() {
        if (!this._cachePaintInfo) {
            this._cachePaintInfo = this.buildPaintInfo();
        }
        return this._cachePaintInfo;
    }

    paint() {
        this.paintWith(this.cachePaintInfo);
    }

    private buildPaintInfo(): RectPaintInfo {
        const {rect, fillColor, radius} = this.view;
        const paint = new sk.CanvasKit.Paint();
        paint.setColor(fillColor);
        paint.setAntiAlias(true);
        return {
            rect: rect.toRRectXY(radius, radius),
            paint,
        };
    }

    private paintWith(paintInfo: RectPaintInfo | undefined) {
        if (!paintInfo) return;
        const {rect, paint} = paintInfo;
        const {skCanvas} = this.view.ctx;

        skCanvas.drawRRect(rect, paint);
    }
}
