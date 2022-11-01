import * as React from "react";
import * as ReactDOM from "react-dom";
import {CanvasView} from "./view/canvas-view";
import {initPageView} from "./page/booking-page";

export class Canvas extends React.Component {
    private myRef: React.LegacyRef<HTMLDivElement>;
    private skyView: CanvasView;

    async componentDidMount() {
        const canvasContainer: HTMLDivElement = ReactDOM.findDOMNode(this) as HTMLDivElement;
        this.skyView = await CanvasView.create(canvasContainer);
        initPageView(this.skyView.pageView);
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
