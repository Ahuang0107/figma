import {Color, Path} from "@skeditor/canvaskit-wasm";
import {SkyBaseView} from "./base-view";
import sk from "../utils/canvas-kit";
import {createPath, CurvePoint} from "../utils/path";
import {Point} from "../base/point";
import {Disposable} from "../base/disposable";
import {SkyStyle} from "../model/base";

export class SkyPathView extends SkyBaseView {
    path?: Path;
    _painter?: PathPainter;

    constructor() {
        super();
        let leftTop = new CurvePoint(new Point(50, 50));
        leftTop.cornerRadius = 30;
        let rightTop = new CurvePoint(new Point(150, 50));
        rightTop.cornerRadius = 30;
        let rightBottom = new CurvePoint(new Point(150, 100));
        rightBottom.cornerRadius = 30;
        let leftBottom = new CurvePoint(new Point(50, 100));
        leftBottom.cornerRadius = 30;
        this.path = createPath([leftTop, rightTop, rightBottom, leftBottom], true);
        this.style = new SkyStyle(sk.CanvasKit.Color(47, 47, 47));
    }

    render(): void {
        if (!this._painter) {
            this._painter = new PathPainter(this);
        }
        this._painter.paint();
    }
}

export class PathPainter extends Disposable {
    private paintFnArr = [] as (() => void)[];

    constructor(private view: SkyPathView) {
        super();
        this.calcPaintInfo();
    }

    paint() {
        this.paintFnArr.forEach((fn) => fn());
    }

    private calcPaintInfo() {
        const {path, style} = this.view;

        if (!path) {
            return;
        }

        this.paintFill(path, style?.fillColor);
    }

    private paintFill(path: Path, fillColor: Color) {
        const paint = new sk.CanvasKit.Paint();

        paint.setColor(fillColor);
        paint.setAntiAlias(true);

        this.paintFnArr.push(() => {
            const skCanvas = this.view.ctx.skCanvas;
            skCanvas.drawPath(path, paint);
        });
        this._disposables.push(() => {
            paint.delete();
        });
        return;
    }
}
