import {SkyView} from "../sky-view";


let viewId = 0;

export abstract class SkyBaseView {
    id: number;
    children: SkyBaseView[] = [];

    ctx: SkyView;
    parent?: SkyBaseView;

    protected constructor() {
        this.ctx = SkyView.currentContext;
        this.id = viewId++;
    }

    addChild<T extends SkyBaseView>(child: T): T {
        child.parent = this;
        this.children.push(child);
        return child;
    }

    abstract render(): void;

    protected renderChildren() {
        for (let i = 0; i < this.children.length; i++) {
            const childView = this.children[i];
            childView.render();
        }
    }
}
