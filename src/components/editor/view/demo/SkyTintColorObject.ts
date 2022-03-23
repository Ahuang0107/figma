import SketchFormat from "@sketch-hq/sketch-file-format-ts";
import {SkyBaseObject} from "./SkyBaseObject";
import {SkyColor} from "./SkyColor";

export abstract class SkyTintColorObject<T extends SketchFormat.AnyObject> extends SkyBaseObject<T> {
    tintColor?: SkyColor
    _color = new SkyColor()

    get color() {
        this._color.tintColor = this.tintColor;
        return this._color;
    }
}
