import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import {SkyBaseLayer} from "./SkyBaseLayer";
import {ClassValue} from "./ClassValue";

export abstract class SkyBaseGroup<T extends SketchFormat.AnyGroup = SketchFormat.AnyGroup> extends SkyBaseLayer<T> {

    layers: (
        | SkyGroup
        | SkyShapeGroup
        )[] = []

    _fromJson(data: T) {
        this.buildLayers(data.layers as SketchFormat.AnyLayer[])
    }

    private buildLayers(layers: SketchFormat.AnyLayer[]) {
        layers.forEach((layer) => {
            switch (layer._class) {
                case SketchFormat.ClassValue.Group:
                    return this.layers.push(new SkyGroup().fromJson(layer))
                case SketchFormat.ClassValue.ShapeGroup:
                    return this.layers.push(new SkyShapeGroup().fromJson(layer))
                default:
                    return;
            }
        })
    }
}

export class SkyGroup extends SkyBaseGroup<SketchFormat.Group> {
    readonly _class = ClassValue.Group
}

export class SkyShapeGroup extends SkyBaseGroup<SketchFormat.ShapeGroup> {
    readonly _class = ClassValue.ShapeGroup
}
