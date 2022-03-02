import * as React from "react";
import {initCanvasKitAndFont} from "./utils";
import {CanvasView} from "./view/canvas-view";

export class Canvas extends React.Component {
    private readonly myRef: React.RefObject<HTMLCanvasElement>;
    private skyView: CanvasView;

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        initCanvasKitAndFont().then(() => {
            this.skyView = new CanvasView(this.myRef.current);
        })
        window.addEventListener("resize", () => {
            this.skyView.reSize();
        })
    }

    render(): JSX.Element {
        return (
            <canvas ref={this.myRef} style={{position: "absolute", userSelect: "none"}}/>
        )
    }
}
