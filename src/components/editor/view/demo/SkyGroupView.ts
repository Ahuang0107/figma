import {SkyBaseGroupView} from "./SkyBaseGroupView";
import {SkyGroup} from "./SkyBaseGroup";

export class SkyGroupView extends SkyBaseGroupView<SkyGroup> {
    requireLayerDropShadow = true;

    layoutSelf() {
        this.commonLayoutSelf();
    }
}
