export class Point {
    constructor(public x: number = 0, public y: number = 0) {
    }

    compare(point: Point): Point {
        return new Point(this.x - point.x, this.y - point.y);
    }
}
