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
        this.pageBuilder = new BookingPageBuilder({
            startTime: TimeStamp.from(Date.UTC(2021, 0, 1)),
            endTime: TimeStamp.from(Date.UTC(2024, 0, 1)),
            row: 2000,
        });
        // this.pageBuilder.initCellViewInfo().then((layers) => {
        //     this.skyView.pageView.children = layers
        //     this.skyView.markDirty();
        //     this.pageBuilder.initBookingViewInfo().then((layers) => {
        //         this.skyView.pageView.children.push(...layers);
        //         this.skyView.markDirty();
        //     })
        // });
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
