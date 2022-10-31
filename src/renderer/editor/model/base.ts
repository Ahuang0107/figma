import {CanvasView} from "../view/canvas-view";
import sk from "../utils/canvas-kit";
import {Color} from "@skeditor/canvaskit-wasm";

abstract class SkyBaseObject {
    protected ctx!: CanvasView;

    protected constructor() {
        this.ctx = CanvasView.currentContext;
    }
}

export class SkyStyle extends SkyBaseObject {
    constructor(public fillColor: Color = sk.CanvasKit.TRANSPARENT) {
        super();
    }
}
