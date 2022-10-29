import {BehaviorSubject, merge, Observable} from "rxjs";
import {Point} from "../base/point";
import {IZoomListener} from "./i-zoom-listener";

export class ZoomState implements IZoomListener {
    public scale$ = new BehaviorSubject<number>(1);
    changed$: Observable<unknown>;
    private _position$ = new BehaviorSubject<Point>(new Point(0, 0));

    constructor() {
        this.changed$ = merge(this._position$, this.scale$);
    }

    onOffset(delta: Point): void {
    }

    onScale(scaleMultiply: number, center: Point): void {
    }
}
