import {SkyView} from "./SkyView";

let viewId = 0

export abstract class SkyBaseView {
    id: number
    ctx: SkyView

    protected constructor() {
        this.id = viewId++
        this.ctx = SkyView.currentContext
    }
}
