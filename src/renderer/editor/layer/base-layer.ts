import {Rect} from "../base/rect";
import {CanvasView} from "../view/canvas-view";

let uid = 1;

export abstract class BaseLayer {
    ctx: CanvasView;
    id: number;

    protected constructor(public rect: Rect) {
        this.ctx = CanvasView.currentContext;
        this.id = uid++;
    }

    abstract render(): void;
}
