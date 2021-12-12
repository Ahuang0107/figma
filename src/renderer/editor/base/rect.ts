import sk from "../utils/canvas-kit";

export class Rect {
  constructor(
      public x: number = 0,
      public y: number = 0,
      public width: number = 0,
      public height: number = 0
  ) {
  }

  toSk() {
    return sk.CanvasKit.XYWHRect(this.x, this.y, this.width, this.height);
  }
}
