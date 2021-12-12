import sk from "../utils/canvas-kit";

export class Rect {
    constructor(
        public x: number = 0,
        public y: number = 0,
        public width: number = 0,
        public height: number = 0
    ) {
    }

    get left() {
        return this.x
    }

    get right() {
        return this.x + this.width
    }

    get top() {
        return this.y
    }

    get bottom() {
        return this.y + this.height
    }

    toSk() {
        return sk.CanvasKit.XYWHRect(this.x, this.y, this.width, this.height);
    }
}
