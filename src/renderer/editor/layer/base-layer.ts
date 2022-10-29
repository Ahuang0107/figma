import {Rect} from "../base/rect";
import {CanvasView} from "../view/canvas-view";
import {Position} from "../base/position";
import sk, {Color} from "../utils/canvas-kit";

let uid = 1;

type LayerType = "TextLayer" | "ShapeLayer";

export abstract class BaseLayer {
    ctx: CanvasView;
    id: number;
    type: LayerType

    protected constructor(public rect: Rect) {
        this.ctx = CanvasView.currentContext;
        this.id = uid++;
        this.ctx.mousemoveEvent.subscribe((e) => {
            const bounds = this.ctx.canvasEl.getBoundingClientRect();
            const position = this.getPosition();
            const isXInCanvas = (e.clientX >= (bounds.left + position.left) && e.clientX <= (bounds.left + position.right));
            const isYInCanvas = (e.clientY >= (bounds.top + position.top) && e.clientY <= (bounds.top + position.bottom));
            if (isXInCanvas && isYInCanvas && this.type == "ShapeLayer") this.ctx.isHoveredLayerId = this.id;
        });
        this.ctx.mouseleaveEvent.subscribe((e) => {
            this.ctx.isHoveredLayerId = null;
        });
    }

    get isHovered() {
        return this.id == this.ctx.isHoveredLayerId
    }

    getPosition(): Position {
        return new Position(this.rect.x, this.rect.x + this.rect.width, this.rect.y, this.rect.y + this.rect.height).multiplyScale(this.ctx.scale)
    }

    abstract render(): void;

    renderLayer() {
        this.render();
        this.renderHover();
    }

    renderHover() {
        if (this.isHovered && this.type == "ShapeLayer") {
            const strokePaint = new sk.CanvasKit.Paint();
            strokePaint.setColor(Color.BLUE);
            strokePaint.setStyle(sk.CanvasKit.PaintStyle.Stroke);
            strokePaint.setStrokeWidth(2);
            this.ctx.skCanvas.drawRect(this.rect.toRect(), strokePaint);
        }
    }
}
