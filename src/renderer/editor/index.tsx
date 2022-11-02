import * as React from "react";
import * as ReactDOM from "react-dom";
import {CanvasView} from "./view/canvas-view";
import {BookingPageBuilder} from "./page/booking-page-builder";
import {TimeStamp} from "./utils/time-stamp";

export class Canvas extends React.Component {
    private myRef: React.LegacyRef<HTMLDivElement>;
    private skyView: CanvasView;
    private pageBuilder: BookingPageBuilder;

    async componentDidMount() {
        const startTime = Date.now();
        const canvasContainer: HTMLDivElement = ReactDOM.findDOMNode(this) as HTMLDivElement;
        this.skyView = await CanvasView.create(canvasContainer);
        // this.skyView.pageView.push([
        //     new SkyRectView(new Rect(400, 400, 50, 50), sk.CanvasKit.BLACK)
        // ]);
        // this.skyView.pageView.pushA([
        //     new SkyRectView(new Rect(10, 10, 50, 50), sk.CanvasKit.BLACK)
        // ]);
        // this.skyView.pageView.pushAY([
        //     new SkyRectView(new Rect(400, 10, 50, 50), sk.CanvasKit.BLACK)
        // ]);
        // this.skyView.pageView.pushAX([
        //     new SkyRectView(new Rect(10, 400, 50, 50), sk.CanvasKit.BLACK)
        // ]);
        this.pageBuilder = new BookingPageBuilder({
            startTime: TimeStamp.from(Date.UTC(2021, 0, 1)),
            endTime: TimeStamp.from(Date.UTC(2024, 0, 1)),
            row: 2000,
        });
        // this.pageBuilder.initCellTopInfo().then(() => {
        //     this.skyView.pageView.pushAY(this.pageBuilder.yAbsoluteChildren);
        //     this.skyView.markDirty();
        // });
        // this.pageBuilder.initCellLeftTopInfo().then(() => {
        //     this.skyView.pageView.pushA(this.pageBuilder.absoluteChildren);
        //     this.skyView.markDirty();
        // });
        // this.pageBuilder.initCellLeftInfo().then(() => {
        //     this.skyView.pageView.pushAX(this.pageBuilder.xAbsoluteChildren);
        //     this.skyView.markDirty();
        // });
        // this.pageBuilder.initCellContentInfo().then(() => {
        //     this.skyView.pageView.push(this.pageBuilder.children);
        //     this.skyView.markDirty();
        // });
        this.pageBuilder.initCellViewInfo().then(() => {
            this.skyView.pageView.push(this.pageBuilder.children);
            this.skyView.pageView.pushA(this.pageBuilder.absoluteChildren);
            this.skyView.pageView.pushAX(this.pageBuilder.xAbsoluteChildren);
            this.skyView.pageView.pushAY(this.pageBuilder.yAbsoluteChildren);
            this.skyView.markDirty();
            // this.pageBuilder.initBookingViewInfo().then(() => {
            //     this.skyView.pageView.children.push(...this.pageBuilder.bookingLayers);
            //     this.skyView.markDirty();
            // })
        });
        this.skyView.startTick();
        console.log("create canvas cost: ", Date.now() - startTime);
    }

    render(): JSX.Element {
        this.myRef = React.createRef();
        return (
            <div ref={this.myRef} style={{
                width: "100%",
                height: "100%",
                position: "relative"
            }}/>
        )
    }
}
