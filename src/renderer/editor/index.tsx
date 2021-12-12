import * as React from "react";
import * as ReactDOM from "react-dom";
import {initCanvasKitAndFont} from "./utils";
import {SkyView} from "./view/sky-view";

export class Canvas extends React.Component {
    private myRef: React.LegacyRef<HTMLCanvasElement>;
    private skyView: SkyView;

    componentDidMount() {
        initCanvasKitAndFont().then(() => {
            const canvasElement: HTMLCanvasElement = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
            this.skyView = new SkyView(canvasElement);
        })
    }

    render(): JSX.Element {
        this.myRef = React.createRef();
        return (
            <canvas ref={this.myRef}/>
        )
    }
}
