import * as React from "react";
import {Layer} from "../../dto/layer";
import "./style.scss";
import {ExpandIcon, FrameThumbnailIcon} from "../icon";

interface PropsType {
    deep?: number,
    data: Layer
}

export function LayerItem(props: PropsType) {
    const {deep = 0, data} = props
    const paddingLeft = 5 + (deep ? deep * 25 : 0)
    let children = data?.subLayers?.map((value, index) => {
        return <LayerItem data={value} key={index} deep={deep + 1}/>
    })
    return (
        <>
            <div className={"layer-wrapper"} style={{paddingLeft: paddingLeft}}>
            <span className={"layer-item-expand"}>
                <ExpandIcon style={{color: "#B3B3B3"}}/>
            </span>
                <span className={"layer-item-icon"}>
                <FrameThumbnailIcon/>
            </span>
                <span className={"layer-item-text"}>{data.name}</span>
            </div>
            {children}
        </>
    )
}
