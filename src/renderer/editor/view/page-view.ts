import {ZoomState} from "../controller/zoom-state";
import {ZoomController} from "../controller/zoom-controller";
import {SkyBaseLayerView} from "./base-layer-view";
import {Rect} from "../base/rect";
import {Transform} from "../base/transform";

export class SkyPageView extends SkyBaseLayerView {
    zoomState: ZoomState;
    controller!: ZoomController;
    transform = new Transform();
    children: SkyBaseLayerView[] = [];

    constructor() {
        super(new Rect());
        this.zoomState = new ZoomState({
            yBelowOrigin: false
        });
        this.initController();
    }

    push<T extends SkyBaseLayerView>(view: T) {
        this.children.push(view)
    }

    _render() {
        this.applyTransform();
        this.children.forEach(child => {
            child.render();
        })
    }

    updateTransform() {
        const {position, scale} = this.zoomState;
        this.transform.position.set(position.x, position.y);
        this.transform.scale.set(scale, scale);
        this.transform.updateLocalTransform();
    }

    protected applyTransform() {
        const {skCanvas} = this.ctx;
        this.updateTransform();
        const arr = this.transform.localTransform.toArray(false);
        skCanvas.concat(arr);
    }

    private initController() {
        // todo, add to dispose
        this.ctx.canvasEl$.subscribe((el) => {
            this.controller = new ZoomController(el!, this.zoomState);
        });

        this.zoomState.changed$.subscribe(() => {
            this.ctx.pageState.reset();
            this.ctx.markDirty();
        });
    }
}
