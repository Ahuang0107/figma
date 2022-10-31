import {BehaviorSubject, merge, Observable} from "rxjs";
import {Point} from "../base/point";
import {IZoomListener} from "./i-zoom-listener";
import sk from "../utils/canvas-kit";

export class ZoomState implements IZoomListener {
    public scale$ = new BehaviorSubject<number>(1);

    private _position$ = new BehaviorSubject<Point>(new Point(0, 0));

    changed$: Observable<unknown>;

    constructor() {
        this.changed$ = merge(this._position$, this.scale$);
    }

    get position() {
        return this._position$.value;
    }

    get scale() {
        return this.scale$.value;
    }

    // 应用了 position、scale 后相当于这个 matrix
    get matrix() {
        return sk.CanvasKit.Matrix.multiply(
            sk.CanvasKit.Matrix.translated(this.position.x, this.position.y),
            sk.CanvasKit.Matrix.scaled(this.scale, this.scale)
        );
    }

    get interMatrix() {
        return sk.CanvasKit.Matrix.invert(this.matrix)!;
    }

    onOffset(offset: Point): void {
        this._position$.next(this.position.minus(offset));
    }
}
