import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import {SkyBaseObject} from "./SkyBaseObject";
import {Rect} from "./Rect";
import {SkyStyle} from './SkyStyle';

export abstract class SkyBaseLayer<T extends SketchFormat.AnyLayer = SketchFormat.AnyLayer> extends SkyBaseObject<T> {

    frame = new Rect()
    private _sharedStyleID?: string
    private _name = ''

    style?: SkyStyle

    inflateFrame(rawFrame: Rect) {
        return rawFrame
    }

    fromJson(data: T) {
        const {frame, sharedStyleID} = data

        this.frame = new Rect(frame.x, frame.y, frame.width, frame.height)

        this._sharedStyleID = sharedStyleID

        this.objectId = data.do_objectID

        if (data.style) {
            this.style = new SkyStyle().fromJson(data.style);
        }

        this._name = data.name
        this._fromJson(data)
        return this
    }

    abstract _fromJson(data: T)
}
