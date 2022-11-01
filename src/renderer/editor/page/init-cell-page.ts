import {SkyPageView} from "../view/page-view";
import {Rect} from "../base/rect";
import sk from "../utils/canvas-kit";
import {SkyLineView} from "../view/line-view";

export async function initCellView(): Promise<SkyPageView> {
    const pageView = new SkyPageView();
    /*2022-10-31作为显示原点*/
    const origin = 1666659600000;
    const scaleX = 25;
    const cellHeight = 20;
    const cellMargin = 5;

    const greyColor = sk.CanvasKit.Color(47, 47, 47);

    /*渲染垂直的单元格边框逻辑*/
    let start = 1640966400000;/*2022-01-01*/
    while (start < 1704038400000) {/*2024-01-01*/
        const beforeStart = scaleX * (start - origin) / 1000 / 60 / 60 / 24;
        const lineView = new SkyLineView(new Rect(beforeStart, 0, 0, 2000), greyColor);
        pageView.push(lineView);
        start += 604800000 / 7;
    }

    /*渲染水平的单元格边框逻辑*/
    let index = 0;
    while (index < 100) {
        const y = index * (cellHeight + cellMargin);
        const lineView = new SkyLineView(new Rect(-8000, y, 20000, 0), greyColor);
        pageView.push(lineView);
        index++;
    }

    return pageView
}
