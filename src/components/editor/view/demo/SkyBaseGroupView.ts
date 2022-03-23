import {SkyBaseGroup} from "./SkyBaseGroup";
import {SkyBaseLayerView} from "./SkyBaseLayerView";

export abstract class SkyBaseGroupView<T extends SkyBaseGroup = SkyBaseGroup> extends SkyBaseLayerView<T> {
    children!: SkyBaseLayerView[]

    _render() {
        this.renderChildren();
    }

    protected renderChildren() {
        const {skCanvas} = this.ctx

        for (let i = 0; i < this.children.length; i++) {
            const childView = this.children[i]
            childView.render()
        }
    }
}
