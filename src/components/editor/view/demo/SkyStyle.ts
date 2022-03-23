import SketchFormat from "@sketch-hq/sketch-file-format-ts";
import {SkyBaseObject} from "./SkyBaseObject";
import {SkyBorder} from "./SkyBorder";

export class SkyStyle extends SkyBaseObject<SketchFormat.Style> {

    private _borders: SkyBorder[] = []

    fromJson(data: SketchFormat.Style) {
        data.borders?.map((border) => {
            this._borders.push(new SkyBorder().fromJson(border));
        });

        return this;
    }
}
