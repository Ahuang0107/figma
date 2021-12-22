import {Rect} from "../base/rect";
import {CanvasView} from "../view/canvas-view";
import {Position} from "../base/position";

let uid = 1;

export abstract class BaseLayer {
    ctx: CanvasView;
    id: number;
    isHovered: boolean = false;

    protected constructor(public rect: Rect) {
        this.ctx = CanvasView.currentContext;
        this.id = uid++;
        this.ctx.mousemoveEvent.subscribe((e) => {
            const bounds = this.ctx.canvasEl.getBoundingClientRect();
            const position = this.getPosition();
            const isXInCanvas = (e.clientX >= (bounds.left + position.left) && e.clientX <= (bounds.left + position.right));
            const isYInCanvas = (e.clientY >= (bounds.top + position.top) && e.clientY <= (bounds.top + position.bottom));
            this.isHovered = isXInCanvas && isYInCanvas;
        });
        this.ctx.mouseleaveEvent.subscribe((e) => {
            this.isHovered = false;
        });
    }

    getPosition(): Position {
        return new Position(this.rect.x, this.rect.x + this.rect.width, this.rect.y, this.rect.y + this.rect.height).multiplyScale(this.ctx.scale)
    }

    abstract render(): void;
}
