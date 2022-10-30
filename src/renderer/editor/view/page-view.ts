import {SkyBaseView} from "./base-view";

export class SkyPageView {
    children: SkyBaseView[] = [];

    push<T extends SkyBaseView>(view: T) {
        this.children.push(view)
    }

    render() {
        this.children.forEach(child => {
            child.render();
        })
    }
}
