import * as React from "react";
import * as ReactDOM from "react-dom";
import {initCanvasKitAndFont} from "./utils";
import {CanvasView} from "./view/canvas-view";
import {FontMgr} from "canvaskit-wasm";

export class Canvas extends React.Component {
    private myRef: React.LegacyRef<HTMLCanvasElement>;
    private skyView: CanvasView;

    componentDidMount() {
        initCanvasKitAndFont().then((fontMgr: FontMgr) => {
            const canvasElement: HTMLCanvasElement = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
            this.skyView = new CanvasView(canvasElement);
        })
        window.addEventListener("resize", () => {
            this.skyView.reSize();
        })
    }

    render(): JSX.Element {
        this.myRef = React.createRef();
        return (
            <canvas ref={this.myRef} style={{position: "absolute", userSelect: "none"}}/>
        )
    }
}
