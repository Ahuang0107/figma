import {Rect} from "../base/rect";

export abstract class SkyBaseLayer {
    parent?: SkyBaseLayer;
    frame = new Rect();
}

export abstract class SkyBaseGroup {
    layers: (
        | SkyGroup
        | SkyShapeGroup
        )[] = [];
}

export class SkyText extends SkyBaseLayer {
    readonly _class = ClassValue.Text;
}

export class SkyGroup extends SkyBaseGroup {
    readonly _class = ClassValue.Group;
}

export class SkyShapeGroup extends SkyBaseGroup {
    readonly _class = ClassValue.ShapeGroup;
}

export abstract class SkyBaseObject {
    readonly abstract _class: ClassValue;
}

export const enum ClassValue {
    ShapeGroup = 'ShapeGroup',
    ShapeLike = 'ShapeLike',
    ShapePath = 'ShapePath',
    Rectangle = 'Rectangle',
    Triangle = 'Triangle',
    Group = 'Group',
    Page = 'Page',
    Text = 'Text',
    BaseObject = 'BaseObject',
    BaseLayer = 'BaseLayer',
    BaseGroup = 'BaseGroup',
}
