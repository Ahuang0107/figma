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
    absoluteChildren: SkyBaseLayerView[] = [];
    xAbsoluteChildren: SkyBaseLayerView[] = [];
    yAbsoluteChildren: SkyBaseLayerView[] = [];

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

    pushA<T extends SkyBaseLayerView>(view: T) {
        this.absoluteChildren.push(view)
    }

    pushAX<T extends SkyBaseLayerView>(view: T) {
        this.xAbsoluteChildren.push(view)
    }

    pushAY<T extends SkyBaseLayerView>(view: T) {
        this.yAbsoluteChildren.push(view)
    }

    _render() {
        const {skCanvas} = this.ctx;
        const {position} = this.zoomState;
        this.absoluteChildren.forEach(child => {
            child.render();
        })

        let saveCount = skCanvas.save();
        this.transform.position.set(position.x, 0);
        this.transform.updateLocalTransform();
        skCanvas.concat(this.transform.localTransform.toArray(false));
        this.yAbsoluteChildren.forEach(child => {
            child.render();
        })
        skCanvas.restoreToCount(saveCount);

        saveCount = skCanvas.save();
        this.transform.position.set(0, position.y);
        this.transform.updateLocalTransform();
        skCanvas.concat(this.transform.localTransform.toArray(false));
        this.xAbsoluteChildren.forEach(child => {
            child.render();
        })
        skCanvas.restoreToCount(saveCount);

        this.transform.position.set(position.x, position.y);
        this.transform.updateLocalTransform();
        skCanvas.concat(this.transform.localTransform.toArray(false));
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
            this.ctx.pageState.reset();
            this.ctx.markDirty();
        });
    }
}
