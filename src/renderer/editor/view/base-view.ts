import {CanvasView} from "./canvas-view";

let viewId = 0;

export abstract class SkyBaseView {
    id: number;
    ctx: CanvasView;
    parent?: SkyBaseView;

    constructor() {
        this.ctx = CanvasView.currentContext;
        this.id = viewId++;
    }
}
