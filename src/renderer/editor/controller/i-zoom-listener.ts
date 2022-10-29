import {Point} from "../base/point";

export interface IZoomListener {
    // set final scale
    onScale(scaleMultiply: number, center: Point): void;

    // emit offset
    onOffset(delta: Point): void;
}
