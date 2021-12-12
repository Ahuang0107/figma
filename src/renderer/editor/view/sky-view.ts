import {Canvas, FontMgr, Surface} from "canvaskit-wasm";
import {SkyPageContainerView} from "./page-view";
import {Rect} from "../base/rect";
import sk, {fontMgr} from "../utils/canvas-kit";

export class SkyView {
  static currentContext: SkyView;

  foreignEl: HTMLElement;
  canvasEl: HTMLCanvasElement
  rootView?: SkyPageContainerView;

  skSurface!: Surface;
  skCanvas!: Canvas;
  fontMgr!: FontMgr;

  // store width,height of the canvasEl
  frame = new Rect();

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvasEl = canvasEl;
    this.canvasEl.style.position = "absolute";

    this.foreignEl = this.canvasEl.parentElement

    // get <canvas/>'s bound and record to frame
    this.reSize()

    // create surface and canvas on <canvas/>
    this.skSurface = sk.CanvasKit.MakeCanvasSurface(this.canvasEl)!;
    this.skCanvas = this.skSurface.getCanvas();

    // create schedule render task
    const renderSchedule = () => {
      this.render();
      window.requestAnimationFrame(renderSchedule);
    };
    window.requestAnimationFrame(renderSchedule);
    // const view = this;
    // animationFrameScheduler.schedule(function() {
    //   view.render();
    //   this.schedule();
    // }, 0)

    this.fontMgr = fontMgr;
    SkyView.currentContext = this;
  }

  get zoomState() {
    return this.rootView!.zoomState;
  }

  renderPage() {
    this.rootView = new SkyPageContainerView();
  }

  protected render() {
    this.skCanvas.clear(sk.CanvasKit.TRANSPARENT);
    if (this.rootView) {
      this.skCanvas.save();
      this.rootView.render();
      this.skCanvas.restore();
      this.skSurface.flush();
    }
  }

  private reSize() {
    const bounds = this.foreignEl.getBoundingClientRect();
    this.canvasEl.width = bounds.width;
    this.canvasEl.height = bounds.height;
    this.frame.width = bounds.width;
    this.frame.height = bounds.height;
  }
}
