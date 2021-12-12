import * as React from "react";
import {initCanvasKitAndFont} from "./utils";
import {SkyView} from "./view/sky-view";
import ReactDOM = require("react-dom");

export class Canvas extends React.Component {
    private myRef: React.LegacyRef<HTMLCanvasElement>;
    private skyView: SkyView;

    componentDidMount() {
        initCanvasKitAndFont().then(() => {
            const canvasElement: HTMLCanvasElement = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
            let skyView = new SkyView(canvasElement);
            skyView?.renderPage();
        })
    }

    render(): JSX.Element {
        this.myRef = React.createRef();
        return (
            <canvas ref={this.myRef}/>
        )
    }
}
