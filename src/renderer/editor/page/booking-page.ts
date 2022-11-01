import {SkyPageView} from "../view/page-view";
import {bookings, login, staffs} from "../../../client";
import {Rect} from "../base/rect";
import {SkyRectView} from "../view/rect-view";
import sk from "../utils/canvas-kit";
import {SkyTextView} from "../view/text-view";

export async function initPageView(pageView: SkyPageView) {
    /* todo 这里是mock data的部分，之后再删除
            *   目前需要做的是，一遍把渲染逻辑根据sk-editor完善，
            *   一边考虑如何做到高效的渲染retain的booking界面
            *   比如把左侧的渲染和上方的渲染都分出来，这样就有三个渲染页面
            *   左侧和中间的y轴移动同步，上方和中间的x轴移动同步
            *   同时还要考虑到点击交互，点击时判断点击点相对画布视窗的坐标，画布的世界坐标，以及对应目前显示的数据
            *   另外一个问题是，当不显示周末列的功能要如何实现呢？生成画面元素的时候就要把每周末的时间考虑进去，然后算坐标时去掉？
            *   这样看周末和不看周末的视图是不是也要分成两个page
            *   按照月，按照周，按照日的也都要分成不同的page
            *   那也就是page之外的渲染逻辑 */
    /*2022-10-31作为显示原点*/
    const origin = 1666659600000;
    const scaleX = 25;
    const cellHeight = 20;
    const cellMargin = 5;

    const cellOffsetX = 3;
    const cellOffsetY = 2;
    await login();

    let staffRes = await staffs(0, 40);
    let bookingRes = await bookings(staffRes.map(v => v.id).join(), 1664121600000, 1672502400000);
    const greyColor = sk.CanvasKit.Color(47, 47, 47);

    let index = 0;
    staffRes.forEach(staff => {
        const y = index * (cellHeight + cellMargin);
        // @ts-ignore
        bookingRes[staff.id]?.forEach(booking => {
            const beforeStart = scaleX * (booking.startTime - origin) / 1000 / 60 / 60 / 24;
            const during = scaleX * (booking.endTime - booking.startTime) / 1000 / 60 / 60 / 24;
            const pageRect = new Rect(beforeStart + cellOffsetX, y + cellOffsetY, during, cellHeight);
            const pathView = new SkyRectView(pageRect, greyColor, 3);
            pageView.push(pathView);
            const textView = new SkyTextView(pageRect, booking.id);
            pageView.push(textView);
        });
        index++;
    });
    pageView.ctx.markDirty();
}
