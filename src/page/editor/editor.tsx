import * as React from "react";
import {getColorPallet} from "../../utils";
import {Button} from "../../components";
import "./style.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState, select} from "../../store";
import {MenusConst} from "../../constants/menus-const";
import {Canvas} from "../../components/editor";

export function Editor() {
    const theme = useSelector(((state: RootState) => state.themeSelector))
    const pallet = getColorPallet(theme)

    const selectedTool = useSelector(((state: RootState) => state.toolSelector.tool))

    const dispatch = useDispatch()

    const menusButton = MenusConst.map((menu) => {
        return <Button
            key={menu.tool}
            isActive={menu.tool === selectedTool}
            icon={menu.icon}
            withFold={menu.withFold}
            onClick={(e) => dispatch(select(menu.tool))}/>
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
                    <Canvas/>
                </div>
                <div className="property-panel"></div>
            </div>
        </div>
    )
}

