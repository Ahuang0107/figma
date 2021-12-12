import {SkyBoxView} from "./base";
import {Paint, ParagraphStyle} from "canvaskit-wasm";
import sk, {defaultFonts} from "../utils/canvas-kit";
import {Rect} from "../base/rect";
import {calcStep} from "../utils";

export const RulerThickness = 25;

const RulerTextMarginLeft = 3;
const RulerTextMarginTop = 3;

let _linePaint: Paint;

export function getLinePaint() {
  if (_linePaint) return _linePaint;
  _linePaint = new sk.CanvasKit.Paint();
  _linePaint.setColor(sk.CanvasKit.Color(169, 169, 169));
  _linePaint.setStyle(sk.CanvasKit.PaintStyle.Stroke);
  _linePaint.setStrokeWidth(1);
  return _linePaint;
}

export class Ruler extends SkyBoxView {
  static RulerThickness = RulerThickness;

  _bgPaint?: Paint;
  _paraStyle: ParagraphStyle;

  constructor(frame: Rect, private isHorizontal: boolean) {
    super(frame);

    this._paraStyle = new sk.CanvasKit.ParagraphStyle({
      textStyle: {
        color: sk.CanvasKit.BLACK,
        fontFamilies: defaultFonts,
        fontSize: 10
      }
    });
  }

  get xBase() {
    return this.ctx.zoomState.offset.x;
  }

  get yBase() {
    return this.ctx.zoomState.offset.y;
  }

  renderSelf() {
    const {width, height} = this.ctx.frame;
    const {skCanvas} = this.ctx;

    skCanvas.save();
    // skCanvas.translate(this.frame.x, this.frame.y);

    if (this.isHorizontal) {
      skCanvas.drawLine(0, RulerThickness, width, RulerThickness, getLinePaint());
      this.drawGroovesTop();
    } else {
      skCanvas.drawLine(RulerThickness, 0, RulerThickness, height, getLinePaint());
      this.drawGroovesLeft();
    }
    skCanvas.restore();
  }

  drawGroovesTop() {
    if (!this.ctx.zoomState) return;

    const {skCanvas} = this.ctx;
    const width = this.frame.width;

    const scale = this.ctx.zoomState.scale;

    const offsetX = this.ctx.zoomState.position.x - this.xBase * scale;

    const representWidth = calcStep(scale);
    const actualWidth = representWidth * scale;

    const rLeft = -(offsetX / scale);
    const rRight = (width - offsetX) / scale;

    function rToA(r: number) {
      return r * scale + offsetX;
    }

    const rFirstBlock = Math.floor(rLeft / representWidth) * representWidth;

    for (let rX = rFirstBlock; rX < rRight; rX += representWidth) {
      const x = rToA(rX);
      skCanvas.drawLine(x, 0, x, RulerThickness, getLinePaint());
      const para = this.createPara(rX + "");
      skCanvas.drawParagraph(para, x + RulerTextMarginLeft, RulerTextMarginTop);
      para.delete();
      const subStep = actualWidth / 10;
      for (let i = 1; i < 10; i++) {
        const subX = x + i * subStep;
        skCanvas.drawLine(subX, RulerThickness - 8, subX, RulerThickness, getLinePaint());
      }
    }
  }

  drawGroovesLeft() {
    const {skCanvas} = this.ctx;
    const height = this.frame.height;

    const scale = this.ctx.zoomState.scale;

    const offsetY = this.ctx.zoomState.position.y - this.yBase * scale;

    const representWidth = calcStep(scale);
    const actualWidth = representWidth * scale;

    const rTop = -(offsetY / scale);
    const rBottom = (height - offsetY) / scale;

    function rToA(r: number) {
      return r * scale + offsetY;
    }

    const rFirstBlock = Math.floor(rTop / representWidth) * representWidth;
    for (let rY = rFirstBlock; rY < rBottom; rY += representWidth) {
      const y = rToA(rY);

      skCanvas.drawLine(0, y, RulerThickness, y, getLinePaint());

      const para = this.createPara(rY + "");

      skCanvas.save();
      skCanvas.translate(RulerTextMarginTop, y - RulerTextMarginLeft);
      skCanvas.rotate(-90, 0, 0);
      skCanvas.drawParagraph(para, 0, 0);
      para.delete();
      skCanvas.restore();

      const subStep = actualWidth / 10;
      for (let i = 1; i < 10; i++) {
        const subY = y + i * subStep;
        skCanvas.drawLine(RulerThickness - 8, subY, RulerThickness, subY, getLinePaint());
      }
    }
  }

  createPara(text: string) {
    const builder = sk.CanvasKit.ParagraphBuilder.Make(this._paraStyle, this.ctx.fontMgr);
    builder.addText(text);
    const para = builder.build();
    para.layout(1e8);
    builder.delete();
    return para;
  }
}
