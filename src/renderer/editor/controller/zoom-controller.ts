import {Point} from "../base/point";


export interface IZoomListener {
    // set final scale
    onScale(deltaY: number, center: Point): void;

    // emit offset
    onOffset(offset: Point): void;
}
