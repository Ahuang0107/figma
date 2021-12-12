import {SkyBoxView} from "./base";
import {Point} from "../base/point";
import {getLinePaint, Ruler, RulerThickness} from "./ruler";
import {Rect} from "../base/rect";
import sk from "../utils/canvas-kit";
import {ZoomState} from "../controller/zoom-state";


export class SkyPageContainerView extends SkyBoxView {
  corner: SkyBoxView;
  zoomState: ZoomState;

  constructor() {
    super();

    this.frame.width = this.ctx.frame.width;
    this.frame.height = this.ctx.frame.height;

    this.zoomState = new ZoomState(new Point(-0, -0));
    this.ctx.canvasEl.addEventListener("wheel", (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        this.zoomState.onScale(e.deltaY, this.zoomState.position);
        console.log(this.zoomState.scale);
      }
    });

    this.addChild(new Ruler(new Rect(RulerThickness, 0, this.pageBounds.width, RulerThickness), true));
    this.addChild(new Ruler(new Rect(0, RulerThickness, RulerThickness, this.pageBounds.height), false));
    this.corner = this.addChild(new CornerView(new Rect(0, 0, RulerThickness, RulerThickness)));
    this.corner.backgroundColor = sk.CanvasKit.WHITE;
  }

  get pageBounds() {
    return new Rect(
        RulerThickness,
        RulerThickness,
        this.ctx.frame.width - RulerThickness,
        this.ctx.frame.height - RulerThickness
    );
  }
}

class CornerView extends SkyBoxView {
  constructor(frame: Rect) {
    super(frame);
  }

  renderSelf() {
    const paint = getLinePaint();
    const {skCanvas} = this.ctx;
    skCanvas.drawLine(0, RulerThickness, RulerThickness, RulerThickness, paint);
    skCanvas.drawLine(RulerThickness, 0, RulerThickness, RulerThickness, paint);
  }
}
