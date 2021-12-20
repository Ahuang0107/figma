import {Color} from "../utils/canvas-kit";
import {Layer} from "./layer";
import {CanvasView} from "./canvas-view";

export class Page {
    background: Float32Array;

    layers: Layer[] = [];

    ctx: CanvasView;

    constructor() {
        this.background = Color.GREY;
        this.ctx = CanvasView.currentContext;
    }

    appendLayer(layer: Layer) {
        this.layers.push(layer);
    }

    render() {
        this.layers.forEach((layer) => {
            layer.render();
        })
    }
}
