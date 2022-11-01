import {CanvasView} from "./canvas-view";

let id = 0;

export abstract class SkyBaseView {
    id: string;
    ctx: CanvasView;

    protected constructor() {
        this.ctx = CanvasView.currentContext;
        this.id = id.toString();
        id++;
    }

    abstract render(): void;
}
