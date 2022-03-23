import {Point} from "./Point";
import sk from "./CanvasKit";

export class Rect {
    static Empty = new Rect(0, 0, 0, 0)

    constructor(public x: number = 0, public y: number = 0, public width: number = 0, public height: number = 0) {
    }

    get onlySize() {
        return new Rect(0, 0, this.width, this.height);
    }

    get left() {
        return this.x;
    }

    get right() {
        return this.x + this.width;
    }

    get top() {
        return this.y;
    }

    get bottom() {
        return this.y + this.height;
    }

    static mergeRects(rects: Rect[]) {
        let left = Number.MAX_SAFE_INTEGER,
            right = Number.MIN_SAFE_INTEGER,
            top = Number.MAX_SAFE_INTEGER,
            bottom = Number.MIN_SAFE_INTEGER;

        if (rects.length === 0) {
            throw new Error('Bad param');
        }

        rects.forEach((rect) => {
            const {x, y, width, height} = rect;

            left = Math.min(left, x);
            right = Math.max(right, x + width);
            top = Math.min(top, y);
            bottom = Math.max(bottom, y + height);
        });
        return new Rect(left, top, right - left, bottom - top);
    }

    static fromPoints(points: Point[]) {
        if (points.length < 2) throw new Error('require at least two points');
        let left = Number.MAX_SAFE_INTEGER;
        let right = Number.MIN_SAFE_INTEGER;
        let top = Number.MAX_SAFE_INTEGER;
        let bottom = Number.MIN_SAFE_INTEGER;

        points.forEach((pt) => {
            left = Math.min(left, pt.x);
            right = Math.max(right, pt.x);
            top = Math.min(top, pt.y);
            bottom = Math.max(bottom, pt.y);
        });
        return new Rect(left, top, right - left, bottom - top);
    }

    scale(s: number) {
        return new Rect(this.x * s, this.y * s, this.width * s, this.height * s);
    }

    roundPixel() {
        const left = Math.floor(this.x);
        const top = Math.floor(this.y);
        const right = Math.ceil(this.x + this.width);
        const bottom = Math.ceil(this.y + this.height);
        return new Rect(left, top, right - left, bottom - top);
    }

    toSk() {
        return sk.CanvasKit.XYWHRect(this.x, this.y, this.width, this.height);
    }
}
