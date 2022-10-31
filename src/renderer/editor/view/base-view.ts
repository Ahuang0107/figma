import {CanvasView} from "./canvas-view";
import {SkyStyle} from "../model/base";

export abstract class SkyBaseView {
    ctx: CanvasView;

    style?: SkyStyle;

    protected constructor() {
        this.ctx = CanvasView.currentContext;
    }

    abstract render(): void;
}
