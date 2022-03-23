import SketchFormat from "@sketch-hq/sketch-file-format-ts";
import {SkyTintColorObject} from "./SkyTintColorObject";

export type SkyFillType = SketchFormat.FillType
export const SkyFillType = SketchFormat.FillType

export const SkyBorderPosition = SketchFormat.BorderPosition
export type SkyBorderPosition = SketchFormat.BorderPosition

export class SkyBorder extends SkyTintColorObject<SketchFormat.Border> {

    isEnabled = true

    fillType: SkyFillType = SkyFillType.Color
    position: SkyBorderPosition = SkyBorderPosition.Center
    thickness = 1

    fromJson(data: SketchFormat.Border) {
        this.isEnabled = data.isEnabled;

        this._color = this.color.fromJson(data.color);

        this.fillType = data.fillType;

        this.position = data.position;

        this.thickness = data.thickness;

        return this;
    }
}
