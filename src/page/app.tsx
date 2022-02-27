import * as React from "react";
import {Themes} from "../store/Themes";
import {inject, observer} from "mobx-react";
import {getColorPallet} from "../utils/render";
import {Button, Icons} from "../components";
import "./style.scss";
import {Tools, ToolType} from "../store/Tools";

interface AppProps {
    themes?: Themes
    tools?: Tools
}

@inject("themes")
@inject("tools")
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

        // todo "需要去看看别人的项目实际生成每个button组件的方式"
        class Menu {
            constructor(
                public tool: ToolType,
                public icon: Icons,
                public withFold: boolean,
                public onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
                public onFoldClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
            ) {
            }
        }

        const menus: Menu[] = [
            new Menu(ToolType.MOVE, "MoveIcon", true),
            new Menu(ToolType.FRAME, "FrameIcon", true),
            new Menu(ToolType.RECTANGLE, "RectangleIcon", true),
            new Menu(ToolType.PEN, "PenIcon", true),
            new Menu(ToolType.TEXT, "TextIcon", true),
            new Menu(ToolType.HAND, "HandIcon", false),
            new Menu(ToolType.COMMENT, "CommentIcon", false),
        ]

        const selectedTool = this.props.tools.selectedTool;
        const menusButton = menus.map((menu) => {
            return <Button
                key={menu.tool}
                isActive={menu.tool === selectedTool}
                icon={menu.icon}
                withFold={menu.withFold}
                onClick={(e) => this.props.tools.select(menu.tool)}/>
        })

        return (
            <div id="body" style={pallet}>
                {/*<div className="electron-top-panel"></div>*/}
                <div className="editor-tools-panel">
                    <div className="action"></div>
                    <div className="tools">
                        {menusButton}
                    </div>
                    <div className="title"></div>
                    <div className="function"></div>
                </div>
                <div className="editor-edit-panel">
                    <div className="layout-manager-panel"></div>
                    <div className="canvas-panel">
                        {/*<Canvas/>*/}
                    </div>
                    <div className="property-panel"></div>
                </div>
            </div>
        )
    }
}

export default App;

