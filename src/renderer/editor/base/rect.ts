import sk from "../utils/canvas-kit";
import {CanvasView} from "../view/canvas-view";
import {Point} from "./point";

export class Rect {
    constructor(
        public x: number = 0,
        public y: number = 0,
        public width: number = 0,
        public height: number = 0
    ) {
    }

    toRect() {
        const {scale} = CanvasView.currentContext;
        return sk.CanvasKit.XYWHRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);
    }

    withTransform(transform: Point): Rect {
        return new Rect(this.x + transform.x, this.y + transform.y, this.width, this.height)
    }
}
