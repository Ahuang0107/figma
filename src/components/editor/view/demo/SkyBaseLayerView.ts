import {SkyBaseLayer} from "./SkyBaseLayer";
import {SkyBaseView} from "./SkyBaseView";
import {Rect} from "./Rect";
import {Point} from "./Point";
import {Transform} from "./Transform";
import {SkyBaseGroup} from "./SkyBaseGroup";
import {ClassValue} from "./ClassValue";
import {SkyGroupView} from "./SkyGroupView";
import {SkyShapeGroupView} from "./SkyShapeGroupView";
import sk, {SkPaint} from "./CanvasKit";

export abstract class SkyBaseLayerView<T extends SkyBaseLayer = SkyBaseLayer> extends SkyBaseView {

    parent?: SkyBaseLayerView
    children: SkyBaseLayerView[] = []

    transform = new Transform()

    layerPaint: SkPaint | null | undefined

    protected scaledFrame?: Rect

    constructor(public model: T) {
        super();
        this.ctx.registerLayer(this.model.objectId, this);
        if (this.model instanceof SkyBaseGroup) {
            this.buildChildren(this.model.layers)
        }
    }

    get frame() {
        return this.scaledFrame || this.model.frame;
    }

    get renderFrame() {
        return this.model.inflateFrame(this.frame.onlySize);
    }

    get bounds() {
        const {x, y, width, height} = this.renderFrame;
        const matrix = this.transform.localTransform.toArray(false);
        const numbs = sk.CanvasKit.Matrix.mapPoints(matrix, [x, y, width, y, width, height, x, height]);
        const points = [] as Point[];
        for (let i = 0; i < numbs.length; i += 2) {
            points.push(new Point(numbs[i], numbs[i + 1]));
        }
        return Rect.fromPoints(points);
    }

    buildChildren(layers: SkyBaseGroup['layers']) {
        layers.forEach((childModel) => {
            switch (childModel._class) {
                case ClassValue.Group:
                    this.addChild(new SkyGroupView(childModel));
                    return;
                case ClassValue.ShapeGroup:
                    this.addChild(new SkyShapeGroupView(childModel));
                    return;
            }
        })
    }

    addChild<T extends SkyBaseLayerView>(child: T): T {
        child.parent = this;
        this.children.push(child);
        return child;
    }


    render() {
        const {skCanvas} = this.ctx
        skCanvas.save()
        this.applyLayerStyle()
        this._render()
        console.log("render")
        skCanvas.restore()
    }

    applyLayerStyle() {
        if (this.layerPaint === undefined) {
            this.buildLayerPaint();
        }
        if (this.layerPaint) {
            const {skCanvas} = this.ctx;

            skCanvas.saveLayer(this.layerPaint);
        }
    }

    buildLayerPaint() {
        const {style} = this.model
        if (!style) {
            this.layerPaint = null;
            return;
        }

        const layerPaint = new sk.CanvasKit.Paint();
        let modified = false;

        if (modified) {
            this.layerPaint = layerPaint;
        } else {
            this.layerPaint = null;
        }
    }

    abstract _render()

    commonLayoutSelf() {
        this.scaledFrame = undefined;
        const info = this.calcInstanceChildScale();
        if (!info) return;
        const {scaleX, scaleY} = info;

        // 被设置的 frame， 对于 instance 来说不能拿 refModel 的
        const oldFrame = this.model.frame;

        const newFrame = new Rect(0, 0, scaleX * oldFrame.width, scaleY * oldFrame.height);
        const {newX, newY} = this.calcOffsetAfterScale(newFrame, oldFrame);
        newFrame.x = newX;
        newFrame.y = newY;

        this.scaledFrame = newFrame;
    }

    calcInstanceChildScale() {
        let scaleX = 1;
        let scaleY = 1;

        return {
            scaleX,
            scaleY,
        };
    }

    calcOffsetAfterScale(newBounds: Rect, oldBounds: Rect) {
        const curFrame = oldBounds;

        let newX = curFrame.x;
        let newY = curFrame.y;

        return {
            newX,
            newY,
        };
    }
}
