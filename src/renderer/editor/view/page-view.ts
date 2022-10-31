import {SkyBaseView} from "./base-view";
import {ZoomState} from "../controller/zoom-state";
import {ZoomController} from "../controller/zoom-controller";

export class SkyPageView extends SkyBaseView {
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

    render() {
        this.children.forEach(child => {
            child.render();
        })
    }

    private initController() {
        // todo, add to dispose
        this.ctx.canvasEl$.subscribe((el) => {
            this.controller = new ZoomController(el!, this.zoomState);
        });

        this.zoomState.changed$.subscribe(() => {
            this.ctx.markDirty();
        });
    }
}
