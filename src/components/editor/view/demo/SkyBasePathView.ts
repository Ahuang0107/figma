import {SkyBaseLayerView} from "./SkyBaseLayerView";
import {SkyShapeGroup} from "./SkyBaseGroup";

type SkyBasePath = SkyShapeGroup

export abstract class SkyBasePathView<T extends SkyBasePath = SkyBasePath> extends SkyBaseLayerView<T> {

}
