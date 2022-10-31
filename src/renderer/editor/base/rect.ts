import sk from "../utils/canvas-kit";

export class Rect {
    constructor(
        public x: number = 0,
        public y: number = 0,
        public width: number = 0,
        public height: number = 0
    ) {
    }

    toXYWHRect(): Float32Array {
        return sk.CanvasKit.XYWHRect(this.x, this.y, this.width, this.height)
    }

    toRRectXY(rx: number, ry: number): Float32Array {
        return sk.CanvasKit.RRectXY(this.toXYWHRect(), rx, ry)
    }
}
