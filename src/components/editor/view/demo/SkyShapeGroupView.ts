import {SkyBasePathView} from "./SkyBasePathView";
import {SkyShapeGroup} from "./SkyBaseGroup";
import {SkPath} from "./CanvasKit";

export class SkyShapeGroupView extends SkyBasePathView<SkyShapeGroup> {
    path?: SkPath;

    _render() {
    }

}
