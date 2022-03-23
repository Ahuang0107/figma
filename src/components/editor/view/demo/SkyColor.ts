import SketchFormat from "@sketch-hq/sketch-file-format-ts";
import {SkyBaseObject} from "./SkyBaseObject";
import sk from "./CanvasKit";

export class SkyColor extends SkyBaseObject<SketchFormat.Color> {
    tintColor?: SkyColor

    _skColor = sk.CanvasKit.TRANSPARENT

    fromJson(color: SketchFormat.Color) {
        this._skColor = sk.CanvasKit.Color(
            (color.red * 256) | 0,
            (color.green * 256) | 0,
            (color.blue * 256) | 0,
            color.alpha
        );
        return this;
    }
}
