import {TileManager} from "./TileManager";
import {Rect} from "./Rect";
import {Priority} from "./Priority";

export class Checkerboard {
    high?: Checkerboard
    low?: Checkerboard

    isStair = false

    constructor(private tileManager: TileManager, public scale: number) {
        this.isStair = floorBinaryScale(scale) === scale
    }

    drawViewport(viewport: Rect) {
        const {tileManager, scale} = this
        const viewTileBounds = new TileBounds().fromRect(viewport)
        const {left, top, right, bottom} = viewTileBounds
        const contentTileBounds = this.tileManager.getContentTileBounds(this.scale)
        for (let y = top; y < bottom; y++) {
            for (let x = left; x < right; x++) {
                if (!contentTileBounds.contains(x, y)) continue;
                if (tileManager.hasTile(scale, x, y)) {
                    this.drawTile(x, y);
                } else {
                    tileManager.requireTile(scale, x, y, Priority.Low)
                }
            }
        }
    }

    clear() {
        this.tileManager.clearScaleTile(this.scale);
    }

    drawTile(x: number, y: number) {
        const canvas = this.tileManager.canvas;
        const image = this.tileManager.getTile(this.scale, x, y);
        if (image) {
            canvas.drawImageRect(image, Tile.getRect(0, 0).toSk(), Tile.getRect(x, y).toSk(), null);
        }
    }
}

export class Tile {
    static width = 256;
    static height = 256;

    static getRect(xIdx: number, yIdx: number) {
        return new Rect(xIdx * Tile.width, yIdx * Tile.height, Tile.width, Tile.height);
    }
}

export class TileBounds {
    left = 0;
    top = 0;
    right = 0;
    bottom = 0;

    fromRect(rect: Rect) {
        const tileWidth: number = Tile.width;
        const tileHeight: number = Tile.height;
        // 闭区间 idx
        this.left = Math.floor(rect.x / tileWidth);
        this.top = Math.floor(rect.y / tileHeight);

        // 开区间 idx
        this.right = Math.ceil(rect.right / tileWidth);
        this.bottom = Math.ceil(rect.bottom / tileHeight);
        return this;
    }

    contains(x: number, y: number) {
        return x >= this.left && x < this.right && y >= this.top && y < this.bottom;
    }
}

export function floorBinaryScale(scale: number) {
    if (isNaN(scale) || scale <= 0) throw 'Bad arg';
    return Math.pow(2, Math.floor(Math.log2(scale)));
}
