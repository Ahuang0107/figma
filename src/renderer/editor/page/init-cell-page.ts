import {SkyPageView} from "../view/page-view";
import {Rect} from "../base/rect";
import sk from "../utils/canvas-kit";
import {SkyLineView} from "../view/line-view";
import {SkyRectView} from "../view/rect-view";
import {TimeStamp} from "../utils/time-stamp";

export async function initCellView(): Promise<SkyPageView> {
    const pageView = new SkyPageView();
    /*2022-10-31作为显示原点*/
    const origin = 1666659600000;
    const cellWidth = 25;
    const cellHeight = 20;

    const cellBorderColor = sk.CanvasKit.Color(204, 204, 204);
    const weekendColor = sk.CanvasKit.Color(120, 125, 123);

    /*渲染垂直的单元格边框逻辑*/
    const start = TimeStamp.from(Date.UTC(2022, 0, 1));
    const end = TimeStamp.from(Date.UTC(2023, 0, 1));
    start.loop(TimeStamp.DAY_DURING, end, (time) => {
        const beforeStart = cellWidth * (time.milliseconds - origin) / 1000 / 60 / 60 / 24;
        const lineView = new SkyLineView(new Rect(beforeStart, 0, 0, 2000), cellBorderColor);
        pageView.push(lineView);
        if ((time.milliseconds - 144000) % 604800000 == 0) {
            const rectView = new SkyRectView(new Rect(beforeStart, 0, cellWidth * 2, 2000), weekendColor, 0, false);
            pageView.push(rectView);
        }
    })

    /*渲染水平的单元格边框逻辑*/
    let index = 0;
    while (index < 100) {
        const y = index * cellHeight;
        const lineView = new SkyLineView(new Rect(-8000, y, 20000, 0), cellBorderColor);
        pageView.push(lineView);
        index++;
    }

    return pageView
}
