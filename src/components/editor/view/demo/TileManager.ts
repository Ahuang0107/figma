import {Rect} from "./Rect";
import {CheckerboardPyramid} from "./CheckerboardPyramid";
import {SkyPageView} from "./SkyPageView";
import {Tile, TileBounds} from "./Checkerboard";
import {Priority} from "./Priority";
import {LruCache} from "./lru";
import {SkImage} from "./CanvasKit";

export class TileManager {

    private caches = new LruCache<SkImage>(1024, (img) => img.delete());

    private pyramid = new CheckerboardPyramid(this)
    private requiredTiles: [number, number, number, Priority][] = []

    constructor(private pageView: SkyPageView) {
    }

    get contentBounds() {
        return this.pageView.bounds;
    }

    get ctx() {
        return this.pageView.ctx;
    }

    get canvas() {
        return this.ctx.skCanvas;
    }

    genKey(scale: number, xIdx: number, yIdx: number) {
        return `${scale}:${xIdx}:${yIdx}`;
    }

    hasTile(scale: number, xIdx: number, yIdx: number) {
        return !!this.caches.get(this.genKey(scale, xIdx, yIdx));
    }

    getTile(scale: number, xIdx: number, yIdx: number): SkImage | undefined {
        return this.caches.get(this.genKey(scale, xIdx, yIdx));
    }

    saveTile(scale: number, xIdx: number, yIdx: number, img: SkImage) {
        return this.caches.set(this.genKey(scale, xIdx, yIdx), img);
    }

    drawViewport(scale: number, viewport: Rect) {
        this.requiredTiles.length = 0
        this.pyramid.drawViewport(scale, viewport)
        if (this.requiredTiles.length > 0) {
            this.scheduleWork()
        }
    }

    requireTile(scale: number, x: number, y: number, priority: Priority) {
        this.requiredTiles.push([scale, x, y, priority]);
    }

    clearScaleTile(scale: number) {
        const scaleSt = scale + ':';
        const map = this.caches.map;
        const keys = Object.keys(map);

        for (const key of keys) {
            if (key.indexOf(scaleSt) === 0) {
                this.caches.delete(key);
            }
        }
    }

    getContentTileBounds(scale: number) {
        const pixelRect = this.contentBounds.scale(scale).roundPixel();
        return new TileBounds().fromRect(pixelRect);
    }

    fillTile(scale: number, xIdx: number, yIdx: number) {
        const ctx = this.ctx
        const surface = ctx.makeOffscreenSurface(Tile.width, Tile.height)
        if (!surface) return
        const canvas = surface.getCanvas()
        ctx.pushCanvas(canvas)
        this.pageView.drawContent(scale, Tile.width * xIdx, Tile.height * yIdx)
        ctx.popCanvas()
        surface.flush()
    }

    private async scheduleWork() {
        this.requiredTiles.sort((a, b) => b[3] - a[3])
        for (const args of this.requiredTiles) {
            const [scale, x, y] = args
            this.fillTile(scale, x, y)
        }
    }
}
