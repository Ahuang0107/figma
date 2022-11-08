import {SkyBaseLayerView} from "../view/base-layer-view";
import {TimeStamp} from "../utils/time-stamp";
import sk from "../utils/canvas-kit";
import {SkyLineView} from "../view/line-view";
import {Rect} from "../base/rect";
import {SkyTextView} from "../view/text-view";
import {SkyRectView} from "../view/rect-view";
import {Booking, bookings, engagements, login, staffs} from "../../../client";

interface RetainCellConfig {
    startTime: TimeStamp
    endTime: TimeStamp
    row: number
    skipWeekend?: boolean
}

class LayerGroup {
    constructor(
        public children: SkyBaseLayerView[] = [],
        public absoluteChildren: SkyBaseLayerView[] = [],
        public xAbsoluteChildren: SkyBaseLayerView[] = [],
        public yAbsoluteChildren: SkyBaseLayerView[] = []
    ) {
    }
}

class TableInfo {
    constructor() {
    }
}

/*
* todo 首先需要将基础的渲染逻辑和与业务相关的渲染逻辑区分开来
*  其次对于业务相关的渲染，应该可以再封装一层显示一个单元格和文字的view
*  然后对于overlay的显示，也是针对这个封装好的view，添加一个overlay的信息，在鼠标hover或者focus时增加不同的渲染逻辑
*
* todo 想到了，其实还有跟设计软件画布渲染相同的部分，比如可以单选可以多选，右侧可以显示属性（对于retain booking来说
*  就是booking的具体信息）那么就应该把一个booking作为一个元素，同时有booking信息和绘制信息
*  然后
* */
export class BookingPageBuilder {
    headBgColor = sk.CanvasKit.Color(112, 173, 71);
    leftTable: TableInfo;
    cellLayers: LayerGroup = new LayerGroup();
    bookingLayers: LayerGroup = new LayerGroup();

    constructor(private config: RetainCellConfig) {
    }

    async initCellViewInfo() {
        const {
            startTime,
            endTime,
            row,
            skipWeekend = false
        } = this.config;
        const originTime = TimeStamp.now().toCurrentMonNine();
        const cellWidth = 25;
        const cellHeight = 20;
        const totalHeight = row * cellHeight;
        let totalWidth = 0;

        const cellBorderColor = sk.CanvasKit.Color(204, 204, 204);
        const weekendColor = sk.CanvasKit.Color(120, 125, 123);

        let x = 0;
        let anchorTime = originTime;
        const tempYAChildren = [];
        while (anchorTime.ms < endTime.ms) {
            const lineView = new SkyLineView(new Rect(x, 0, 0, totalHeight), cellBorderColor);
            this.cellLayers.children.push(lineView);
            const topLineView = new SkyLineView(new Rect(x, 0, 0, cellHeight), cellBorderColor);
            tempYAChildren.push(topLineView);
            const textView = new SkyTextView(new Rect(x, cellHeight), anchorTime.debugWeekday(), 12, sk.CanvasKit.BLACK);
            tempYAChildren.push(textView);
            if (skipWeekend) {
                do {
                    anchorTime.plusDay();
                } while (anchorTime.inWeekend())
            } else {
                if (anchorTime.inWeekend()) {
                    const rectView = new SkyRectView(new Rect(x, 0, cellWidth, totalHeight), weekendColor, 0, false);
                    this.cellLayers.children.push(rectView);
                }
                anchorTime.plusDay();
            }
            x += cellWidth;
        }
        totalWidth += x;
        x = 0;
        anchorTime = originTime;
        anchorTime.minusDay();
        x -= cellWidth;
        while (anchorTime.ms > startTime.ms) {
            const lineView = new SkyLineView(new Rect(x, 0, 0, totalHeight), cellBorderColor);
            this.cellLayers.children.push(lineView);
            const topLineView = new SkyLineView(new Rect(x, 0, 0, cellHeight), cellBorderColor);
            tempYAChildren.push(topLineView);
            const textView = new SkyTextView(new Rect(x, cellHeight), anchorTime.debugWeekday(), 12, sk.CanvasKit.BLACK);
            tempYAChildren.push(textView);
            if (skipWeekend) {
                do {
                    anchorTime.minusDay();
                } while (anchorTime.inWeekend())
            } else {
                if (anchorTime.inWeekend()) {
                    const rectView = new SkyRectView(new Rect(x, 0, cellWidth, totalHeight), weekendColor, 0, false);
                    this.cellLayers.children.push(rectView);
                }
                anchorTime.minusDay();
            }
            x -= cellWidth;
        }
        totalWidth -= x;

        const topBgView = new SkyRectView(new Rect(x, 0, totalWidth, cellHeight), sk.CanvasKit.WHITE, 0, false);
        this.cellLayers.yAbsoluteChildren.push(topBgView);
        this.cellLayers.yAbsoluteChildren.push(...tempYAChildren);

        let index = 0;
        const y = index * cellHeight;
        const lineView = new SkyLineView(new Rect(x, y, totalWidth, 0), cellBorderColor);
        this.cellLayers.yAbsoluteChildren.push(lineView);
        index++;
        while (index < row) {
            const y = index * cellHeight;
            const lineView = new SkyLineView(new Rect(x, y, totalWidth, 0), cellBorderColor);
            this.cellLayers.children.push(lineView);
            index++;
        }
    }

    async fetchBookingInfo() {
        // 渲染booking和渲染cell时不一样的逻辑，渲染cell时直接按照时间step去渲染就行，但是booking数据是离散的，
        // 需要去计算booking离原点那天相聚几天？需不需要排除周末？然后当天是否占满整个格子
    }

    async initBookingViewInfo() {
        const {skipWeekend = false} = this.config;
        const originTime = TimeStamp.now().toCurrentMonNine();
        const cellWidth = 25;
        const cellHeight = 20;
        await login();

        let staffRes = await staffs(0, 80);
        let bookingRes = await bookings(staffRes.map(v => v.id).join(), 1666688400000, 1695632400000);
        const rtColor = sk.CanvasKit.Color(112, 124, 116);
        const otColor = sk.CanvasKit.Color(145, 152, 159);

        const staffBookingMap: Map<string, Map<number, Booking[]>> = new Map();

        const engagementSet: Set<string> = new Set();

        const startTime = Date.now();
        staffRes.forEach(staff => {
            const bookings = bookingRes[staff.id] ?? [];
            const typeBookingMap: Map<number, Booking[]> = new Map();
            bookings.forEach(booking => {
                if (typeBookingMap.has(booking.bookingType)) {
                    typeBookingMap.get(booking.bookingType).push(booking)
                } else {
                    typeBookingMap.set(booking.bookingType, [booking])
                }
                engagementSet.add(booking.engagementCodeId);
            });
            staffBookingMap.set(staff.id, typeBookingMap);
        });
        let engagementRes = await engagements(Array.from(engagementSet));
        let y = cellHeight;
        staffBookingMap.forEach((bookingMap, staffId) => {
            bookingMap.forEach((typeBookings, type) => {
                typeBookings.forEach(booking => {
                    const engagementName = engagementRes.filter((v) => v.id == booking.engagementCodeId)[0]?.name ?? "";
                    let fillColor: Float32Array
                    if (type == 111) {
                        fillColor = rtColor
                    } else {
                        fillColor = otColor
                    }
                    let startDays, endDays;
                    if (skipWeekend) {
                        startDays = originTime.betweenWorkdays(TimeStamp.from(booking.startTime));
                        endDays = originTime.betweenWorkdays(TimeStamp.from(booking.endTime));
                    } else {
                        startDays = TimeStamp.from(booking.startTime).distance(originTime).days();
                        endDays = TimeStamp.from(booking.endTime).distance(originTime).days();
                    }
                    const during = endDays - startDays;
                    const pageRect = new Rect(startDays * cellWidth, y, during * cellWidth, cellHeight);
                    const pathView = new SkyRectView(pageRect, fillColor);
                    this.bookingLayers.children.push(pathView);
                    /*数据量一上去paragraphs构建就报错了，请求2000个staff和一整年booking的数据量全部构建渲染信息会报错*/
                    const textView = new SkyTextView(new Rect(startDays * cellWidth, y + 14, during * cellWidth, cellHeight), engagementName.slice(0, 10), 12, sk.CanvasKit.BLACK);
                    this.bookingLayers.children.push(textView);
                });
                y += cellHeight;
            })
        })
        console.log("iter data time: ", Date.now() - startTime);
    }

    async initCellContentInfo() {
        for (let i = 200; i < 700; i += 10) {
            for (let j = 200; j < 700; j += 10) {
                this.cellLayers.children.push(new SkyRectView(new Rect(i, j, 5, 5), sk.CanvasKit.BLACK))
            }
        }
    }

    async initCellLeftTopInfo() {
        this.cellLayers.absoluteChildren.push(new SkyRectView(new Rect(0, 0, 10, 10), sk.CanvasKit.YELLOW))
    }

    async initCellTopInfo() {
        this.cellLayers.yAbsoluteChildren.push(new SkyRectView(new Rect(10, 0, 1000, 10), sk.CanvasKit.GREEN))
        for (let i = 10; i < 1000; i += 10) {
            this.cellLayers.yAbsoluteChildren.push(new SkyLineView(new Rect(i, 0, 0, 10), sk.CanvasKit.BLACK))
        }
    }

    async initCellLeftInfo() {
        this.cellLayers.xAbsoluteChildren.push(new SkyRectView(new Rect(0, 10, 10, 1000), sk.CanvasKit.BLUE))
        for (let i = 10; i < 1000; i += 10) {
            this.cellLayers.xAbsoluteChildren.push(new SkyLineView(new Rect(0, i, 10, 0), sk.CanvasKit.BLACK))
        }
    }
}
