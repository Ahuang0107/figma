import sk from "../utils/canvas-kit";
import {CanvasView} from "../view/canvas-view";

export class Rect {
    constructor(
        public x: number = 0,
        public y: number = 0,
        public width: number = 0,
        public height: number = 0
    ) {
    }

    toSk() {
        const {scale} = CanvasView.currentContext;
        return sk.CanvasKit.XYWHRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);
    }
}
