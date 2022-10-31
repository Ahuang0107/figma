import {SkyBaseView} from "./base-view";
import {Transform} from "../base/transform";

export abstract class SkyBaseLayerView extends SkyBaseView {
    transform = new Transform();

    render() {
        const {skCanvas} = this.ctx;
        skCanvas.save();
        this.applyTransform();
        this._render();
        skCanvas.restore();
    }

    abstract _render(): void;

    updateTransform() {
        this.transform.updateLocalTransform();
    }

    protected applyTransform() {
        const {skCanvas} = this.ctx;
        this.updateTransform();
        const arr = this.transform.localTransform.toArray(false);
        skCanvas.concat(arr);
    }
}
