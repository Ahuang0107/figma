import {Point} from "../base/point";
import {Rect} from "../base/rect";
import {ShapeLayer} from "../layer";

export class DrawFactory {
    static create(startPoint: Point): ShapeDrawer {
        return new ShapeDrawer(startPoint);
    }
}

export class ShapeDrawer {
    rect: Rect;

    constructor(public startPoint: Point) {
        this.rect = new Rect(startPoint.x, startPoint.y);
        console.log(this.rect)
    }

    updateSize(movePoint: Point) {
        console.log(movePoint)
        const diff = movePoint.compare(this.startPoint);
        if (diff.x > 0) {
            this.rect.x = this.startPoint.x;
            this.rect.width = diff.x;
        } else {
            this.rect.x = movePoint.x;
            this.rect.width = -diff.x
        }
        if (diff.y > 0) {
            this.rect.y = this.startPoint.y;
            this.rect.height = diff.y;
        } else {
            this.rect.y = movePoint.y;
            this.rect.height = -diff.y;
        }
    }

    toLayer(): ShapeLayer {
        return new ShapeLayer(this.rect);
    }
}
