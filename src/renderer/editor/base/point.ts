export class Point {
    constructor(public x: number = 0, public y: number = 0) {
    }

    add(pt: Point) {
        return new Point(this.x + pt.x, this.y + pt.y);
    }

    minus(pt: Point) {
        return new Point(this.x - pt.x, this.y - pt.y);
    }
}
