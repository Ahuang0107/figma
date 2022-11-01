import {merge, Subject} from "rxjs";
import {SkyBaseLayerView} from "./base-layer-view";

export class PageState {
    selectedLayerView?: SkyBaseLayerView;
    hoverLayerView?: SkyBaseLayerView;

    selectionChange = new Subject();
    hoverChange = new Subject();

    changed = merge(this.selectionChange, this.hoverChange);

    reset() {
        this.selectLayer(undefined);
        this.hoverLayer(undefined);
    }

    selectLayer(view: SkyBaseLayerView | undefined) {
        if (this.selectedLayerView === view) return;
        this.selectedLayerView = view;
        this.selectionChange.next();
    }

    hoverLayer(view: SkyBaseLayerView | undefined) {
        if (this.hoverLayerView === view) return;
        this.hoverLayerView = view;
        this.hoverChange.next();
    }
}
