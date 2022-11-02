import {SkyPageView} from "../view/page-view";
import {Rect} from "../base/rect";
import sk from "../utils/canvas-kit";
import {SkyLineView} from "../view/line-view";
import {SkyRectView} from "../view/rect-view";
import {TimeStamp} from "../utils/time-stamp";
import {SkyTextView} from "../view/text-view";

export interface RetainCellOption {
    startTime: TimeStamp
    endTime: TimeStamp
    row: number
    skipWeekend?: boolean
}

export async function initCellView({
                                       startTime,
                                       endTime,
                                       row,
                                       skipWeekend = false
                                   }: RetainCellOption): Promise<SkyPageView> {
    const pageView = new SkyPageView();
    const originTime = TimeStamp.now().toCurrentMonNine();
    const cellWidth = 25;
    const cellHeight = 20;
    const totalHeight = row * cellHeight;
    let totalWidth = 0;

    const cellBorderColor = sk.CanvasKit.Color(204, 204, 204);
    const weekendColor = sk.CanvasKit.Color(120, 125, 123);

    let x = 0;
    let anchorTime = originTime;
    while (anchorTime.ms < endTime.ms) {
        const lineView = new SkyLineView(new Rect(x, 0, 0, totalHeight), cellBorderColor);
        pageView.push(lineView);
        const textView = new SkyTextView(new Rect(x, cellHeight), anchorTime.debugWeekday(), 12, sk.CanvasKit.BLACK);
        pageView.push(textView);
        if (skipWeekend) {
            do {
                anchorTime.plusDay();
            } while (anchorTime.inWeekend())
        } else {
            if (anchorTime.inWeekend()) {
                const rectView = new SkyRectView(new Rect(x, 0, cellWidth, totalHeight), weekendColor, 0, false);
                pageView.push(rectView);
            }
            anchorTime.plusDay();
        }
        x += cellWidth;
    }
    totalWidth += x;
    x = 0;
    anchorTime = originTime;
    while (anchorTime.ms > startTime.ms) {
        x -= cellWidth;
        if (skipWeekend) {
            do {
                anchorTime.minusDay();
            } while (anchorTime.inWeekend())
        } else {
            if (anchorTime.inWeekend()) {
                const rectView = new SkyRectView(new Rect(x, 0, cellWidth, totalHeight), weekendColor);
                pageView.push(rectView);
            }
            anchorTime.minusDay();
        }
        const lineView = new SkyLineView(new Rect(x, 0, 0, totalHeight), cellBorderColor);
        pageView.push(lineView);
        const textView = new SkyTextView(new Rect(x, cellHeight), anchorTime.debugWeekday(), 12, sk.CanvasKit.BLACK);
        pageView.push(textView);
    }
    totalWidth -= x;

    let index = 0;
    while (index < row) {
        const y = index * cellHeight;
        const lineView = new SkyLineView(new Rect(x, y, totalWidth, 0), cellBorderColor);
        pageView.push(lineView);
        index++;
    }

    return pageView
}
