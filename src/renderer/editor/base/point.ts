export class Point {
    constructor(public x: number, public y: number) {
    }

    compare(point: Point): Point {
        return new Point(this.x - point.x, this.y - point.y);
    }
}
