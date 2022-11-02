import {SkyPageView} from "../view/page-view";

export class RetainBookingPageBuilder {
    static fromOld(old: SkyPageView): SkyPageView {
        const pageView = new SkyPageView();
        pageView.children = old.children;
        return pageView
    }
}
