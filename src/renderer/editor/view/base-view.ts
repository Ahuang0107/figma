import {CanvasView} from "./canvas-view";

export abstract class SkyBaseView {
    ctx: CanvasView;

    protected constructor() {
        this.ctx = CanvasView.currentContext;
    }

    abstract render(): void;
}
