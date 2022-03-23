import {SkyBaseGroupView} from "./SkyBaseGroupView";
import {SkyPage} from "./Page";
import {TileManager} from "./TileManager";
import {Rect} from "./Rect";

export class SkyPageView extends SkyBaseGroupView<SkyPage> {

    private tileManager: TileManager

    constructor(model: SkyPage) {
        super(model)
        this.tileManager = new TileManager(this)
    }

    get bounds() {
        const children = this.children
        console.log(children)
        if (children.length === 0) return Rect.Empty

        return Rect.mergeRects(this.children.map((child) => child.bounds))
    }

    render() {
        this.renderTiles()
    }

    renderTiles() {
        const {skCanvas} = this.ctx

        let viewport = this.ctx.frame

        skCanvas.save()
        this.tileManager.drawViewport(0.774074074074074, viewport)
        skCanvas.restore()
    }

    drawContent(scale: number, x: number, y: number) {
        const {skCanvas} = this.ctx;
        const contentScale = scale;
        skCanvas.save();

        skCanvas.translate(-x, -y);
        skCanvas.scale(contentScale, contentScale);
        this._render();
        skCanvas.restore();
    }
}
