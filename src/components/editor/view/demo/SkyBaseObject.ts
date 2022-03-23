import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import {SkyModel} from "./SkyModel";

let uid = 1000

export abstract class SkyBaseObject<T extends SketchFormat.AnyObject> {
    objectId = '' + uid++
    protected ctx!: SkyModel

    constructor() {
        this.ctx = SkyModel.currentContext
    }
}
