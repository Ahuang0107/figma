import * as React from "react";
import * as ReactDOM from "react-dom";
import {initCanvasKitAndFont} from "./utils";
import {CanvasView} from "./view/canvas-view";
import {Page} from "./view/page";
import {bookings, staffs} from "../../client";
import {ShapeLayer, TextLayer} from "./layer";
import {Rect} from "./base/rect";
import sk from "./utils/canvas-kit";

export class Canvas extends React.Component {
    private myRef: React.LegacyRef<HTMLCanvasElement>;
    private skyView: CanvasView;

    componentDidMount() {
        initCanvasKitAndFont().then(() => {
            const canvasElement: HTMLCanvasElement = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
            this.skyView = new CanvasView(canvasElement);
            this.mockData()
        })
        window.addEventListener("resize", () => {
            this.skyView.reSize();
        })
    }

    async mockData() {
        const page = new Page();

        const origin = 1666659600000;
        const scaleX = 25;
        const cellHeight = 20;
        const cellMargin = 5;
        const fontSize = 12;

        let staffRes = await staffs();
        let bookingRes = await bookings();

        let index = 0;
        staffRes.forEach(staff => {
            // @ts-ignore
            bookingRes[staff.id]?.forEach(booking => {
                const beforeStart = scaleX * (booking.start_time - origin) / 1000 / 60 / 60 / 24;
                const during = scaleX * (booking.end_time - booking.start_time) / 1000 / 60 / 60 / 24;
                const y = index * (cellHeight + cellMargin);
                // const engage = engageRes.data.find((value) => value.id == booking.engagementCodeId);

                if (beforeStart <= this.skyView.canvasEl.width && y <= this.skyView.canvasEl.height && beforeStart >= 0 && y >= 0) {
                    const columnLayer = new ShapeLayer(new Rect(beforeStart, y, during, cellHeight));
                    const titleLayer = new TextLayer(new Rect(beforeStart, y, during, cellHeight), booking.id, fontSize);
                    page.appendLayer(titleLayer);
                    columnLayer.fillColor = sk.CanvasKit.Color(5, 5, 15, 0.37);
                    page.appendLayer(columnLayer);
                }
            });
            index++;
        });

        this.skyView.updatePage(0, page);
    }

    render(): JSX.Element {
        this.myRef = React.createRef();
        return (
            <canvas ref={this.myRef} style={{position: "absolute", userSelect: "none"}}/>
        )
    }
}
