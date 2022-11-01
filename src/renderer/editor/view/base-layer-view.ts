import {SkyBaseView} from "./base-view";
import {Point} from "../base/point";
import {Rect} from "../base/rect";

export abstract class SkyBaseLayerView extends SkyBaseView {
    enableHover = false;

    protected constructor(public frame: Rect) {
        super();
    }

    render() {
        const {skCanvas} = this.ctx;
        skCanvas.save();
        this._render();
        skCanvas.restore();
    }

    abstract _render(): void;

    containsPoint(pt: Point) {
        const offset = this.ctx.pageView.transform.position;
        return this.frame.containsPoint(pt.minus(new Point(offset.x, offset.y)));
    }
}
