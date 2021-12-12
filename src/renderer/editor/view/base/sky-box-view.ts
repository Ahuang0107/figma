import {Color} from "canvaskit-wasm";
import {SkyBaseView} from "./index";
import {Rect} from "../../base/rect";
import sk from "../../utils/canvas-kit";

export class SkyBoxView extends SkyBaseView {
  clip = true;
  backgroundColor?: Color;

  constructor(public frame: Rect = new Rect()) {
    super();
  }

  render() {
    this.renderSelf();
    this.renderChildren();
  }

  renderSelf() {
    //todo("")
  }

  protected renderChildren() {
    if (!this.children.length) return;
    const {skCanvas} = this.ctx;
    skCanvas.save();
    if (this.clip) skCanvas.clipRect(this.frame.toSk(), sk.CanvasKit.ClipOp.Intersect, true);
    skCanvas.translate(this.frame.x, this.frame.y);
    super.renderChildren();
    skCanvas.restore();
  }
}
