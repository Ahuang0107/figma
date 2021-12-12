import {BehaviorSubject, merge, Observable} from "rxjs";
import {IZoomListener} from "./zoom-controller";
import {Point} from "../base/point";

const MIN_SCALE = 0.1;
const MAX_SCALE = 10;

export class ZoomState implements IZoomListener {
  changed$: Observable<any>;
  private _scale$ = new BehaviorSubject<number>(1);
  private _position$ = new BehaviorSubject<Point>(new Point(0, 0));

  constructor(public offset: Point = new Point()) {
    this.changed$ = merge(this._position$, this._scale$);
    const pt = this._position$.value;
    pt.x = offset.x;
    pt.y = offset.y;
  }

  get position() {
    return this._position$.value;
  }

  get scale() {
    return this._scale$.value;
  }

  onOffset(offset: Point) {
    this._position$.next(this.position.minus(offset));
    console.log(this.position);
  }

  onScale(deltaY: number, center: Point) {
    let newScale = this.scale - deltaY / 1000;
    newScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
    this._scale$.next(newScale);
  }

}
