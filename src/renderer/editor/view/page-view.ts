import {SkyBaseView} from "./base-view";
import {ZoomState} from "../controller/zoom-state";
import {ZoomController} from "../controller/zoom-controller";
import {SkyBaseLayerView} from "./base-layer-view";

export class SkyPageView extends SkyBaseLayerView {
    zoomState: ZoomState;
    controller!: ZoomController;
    children: SkyBaseView[] = [];

    constructor() {
        super();
        this.zoomState = new ZoomState();
        this.initController();
    }

    push<T extends SkyBaseView>(view: T) {
        this.children.push(view)
    }

    _render() {
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

    private initController() {
        // todo, add to dispose
        this.ctx.canvasEl$.subscribe((el) => {
            this.controller = new ZoomController(el!, this.zoomState);
        });

        this.zoomState.changed$.subscribe(() => {
            console.log("zoom state change: ", this.zoomState.position)
            this.ctx.markDirty();
        });
    }
}
