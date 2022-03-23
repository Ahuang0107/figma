import SketchFormat from "@sketch-hq/sketch-file-format-ts";
import {SkyBaseGroup} from "./SkyBaseGroup";

export class SkyPage extends SkyBaseGroup<SketchFormat.Page> {
    _fromJson(data: SketchFormat.Page) {
        super._fromJson(data)
    }

}
