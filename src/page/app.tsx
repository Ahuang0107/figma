import * as React from "react";
import {Themes} from "../store/Themes";
import {inject, observer} from "mobx-react";
import {getColorPallet} from "../utils/render";
import {Button} from "../components";
import "./style.scss";
import {Canvas} from "../components/editor";

interface AppProps {
    themes?: Themes
}

@inject("themes")
@observer
class App extends React.Component<AppProps> {
    props: AppProps

    constructor(props: AppProps) {
        super(props);
        this.props = props;
    }

    render(): JSX.Element {
        const theme = this.props.themes.getCurrentTheme();
        const pallet = getColorPallet(theme);
        return (
            <div id="body" style={pallet}>
                {/*<div className="electron-top-panel"></div>*/}
                <div className="editor-tools-panel">
                    <div className="action"></div>
                    <div className="tools">
                        <Button multiIcon={"MoveIcon"}/>
                        <Button multiIcon={"FrameIcon"}/>
                        <Button multiIcon={"RectangleIcon"}/>
                        <Button multiIcon={"PenIcon"}/>
                        <Button icon={"TextIcon"}/>
                        <Button icon={"HandIcon"}/>
                        <Button icon={"CommentIcon"}/>
                    </div>
                    <div className="title"></div>
                    <div className="function"></div>
                </div>
                <div className="editor-edit-panel">
                    <div className="layout-manager-panel"></div>
                    <div className="canvas-panel">
                        <Canvas/>
                    </div>
                    <div className="property-panel"></div>
                </div>
            </div>
        )
    }
}

export default App;
