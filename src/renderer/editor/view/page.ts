import {CanvasView} from "./canvas-view";
import {Layer} from "../layer";

export class Page {

    layers: Layer[] = [];

    ctx: CanvasView;

    constructor() {
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
