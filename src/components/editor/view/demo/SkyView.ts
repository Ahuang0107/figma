import {SkyModel} from "./SkyModel";
import {SkyPageView} from "./SkyPageView";
import {SkyBaseLayerView} from "./SkyBaseLayerView";
import sk, {CanvasKitPromised, SkCanvas, SkGrDirectContext, SkSurface} from "./CanvasKit";
import {Rect} from "./Rect";

export class SkyView {
    static currentContext: SkyView

    canvasEl: HTMLCanvasElement

    grContext!: SkGrDirectContext
    skSurface?: SkSurface
    skCanvas!: SkCanvas
    _canvasStack = [] as SkCanvas[]

    pageView?: SkyPageView
    frame = new Rect()

    viewMap = new Map<string, SkyBaseLayerView>()

    private constructor(private model: SkyModel, private foreignEl: HTMLDivElement) {
        SkyView.currentContext = this
        this.canvasEl = document.createElement('canvas')
        this.canvasEl.style.display = 'block'

        this.grContext = sk.CanvasKit.MakeGrContext(sk.CanvasKit.GetWebGLContext(this.canvasEl))

        foreignEl.appendChild(this.canvasEl)

        this.startTick()
        this.renderPage()
    }

    static async create(model: SkyModel, canvasEl: HTMLDivElement): Promise<SkyView> {
        await CanvasKitPromised

        return new SkyView(model, canvasEl)
    }

    startTick() {
        const handler = () => {
            this.render()
            setTimeout(handler, 16)
        }
        setTimeout(handler, 16)
    }

    render() {
        this.createSkSurfaceAndCanvas()
        if (this.pageView) {
            this.pageView.render()
        }
    }

    createSkSurfaceAndCanvas() {
        this.skSurface?.delete()
        const surface = sk.CanvasKit.MakeOnScreenGLSurface(
            this.grContext,
            this.canvasEl.width,
            this.canvasEl.height,
            sk.CanvasKit.ColorSpace.SRGB
        )
        if (!surface) return
        this.skSurface = surface
        this.skCanvas = this.skSurface.getCanvas()
    }

    registerLayer(objectId: string, layerView: SkyBaseLayerView) {
        this.viewMap.set(objectId, layerView);
    }

    renderPage(i = 0) {
        const skyPage = this.model.pages[i]
        this.pageView = new SkyPageView(skyPage)
    }

    makeOffscreenSurface(width: number, height: number) {
        if (!this.skSurface) return undefined;
        return this.skSurface.makeSurface({
            ...this.skSurface.imageInfo(),
            width,
            height,
        });
    }

    pushCanvas(canvas: SkCanvas) {
        this._canvasStack.push(this.skCanvas)
        this.skCanvas = canvas
    }

    popCanvas() {
        this.skCanvas = this._canvasStack.pop()
    }
}
