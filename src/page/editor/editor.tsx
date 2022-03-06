import * as React from "react";
import {useEffect, useState} from "react";
import {getColorPallet} from "../../utils";
import {Button} from "../../components";
import "./style.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState, select} from "../../store";
import {MenusConst} from "../../constants/menus-const";
import {Canvas} from "../../components/editor";
import axios from "axios";
import {Layer} from "../../dto/layer";
import {LayerItem} from "../../components/layer-item";

export function Editor() {
    const theme = useSelector(((state: RootState) => state.themeSelector))
    const pallet = getColorPallet(theme)

    const selectedTool = useSelector(((state: RootState) => state.toolSelector.tool))

    const dispatch = useDispatch()

    const [layers, setLayers] = useState<Layer[]>([])

    const menusButton = MenusConst.map((menu) => {
        return <Button
            key={menu.tool}
            isActive={menu.tool === selectedTool}
            icon={menu.icon}
            withFold={menu.withFold}
            onClick={(e) => dispatch(select(menu.tool))}/>
    })
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:3000/page/1")
            setLayers(result.data.layers)
        }
        fetchData()
    }, [])

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
                <div className="layout-manager-panel">
                    {
                        layers?.map((value, index) => <LayerItem data={value} key={index}/>)
                    }
                </div>
                <div className="canvas-panel">
                    <Canvas/>
                </div>
                <div className="property-panel"></div>
            </div>
        </div>
    )
}

