import * as React from "react";
import {useState} from "react";
import {Layer, LayerType} from "../../dto/layer";
import "./style.scss";

interface PropsType {
    deep?: number,
    data: Layer
}

export function LayerItem(props: PropsType) {
    const [expand, setExpand] = useState<boolean>(false)
    const {deep = 0, data} = props
    const paddingLeft = 5 + (deep ? deep * 25 : 0)
    let children = data?.subLayers?.map((value, index) => {
        return <LayerItem data={value} key={index} deep={deep + 1}/>
    })
    return (
        <>
            <div className={"layer-wrapper"} style={{paddingLeft: paddingLeft}}>
                <span className={"layer-item-expand"} onClick={() => setExpand(!expand)}>
                    {data?.subLayers &&
                        <ExpandIcon
                            style={{color: "#B3B3B3", transform: expand ? "rotate(0turn)" : "rotate(-0.25turn)"}}/>}
                </span>
                <span className={"layer-item-icon"}>
                    {getThumbnailIcon(data.type)}
                </span>
                <span className={"layer-item-text"}>{data.name}</span>
            </div>
            {expand && children}
        </>
    )
}

function ExpandIcon(props: {
    style?: React.CSSProperties
}) {
    const {style} = props
    const {color} = style ?? {color: "#000"}
    return (
        <svg style={{...style}} className="svg" width="6" height="6" viewBox="0 0 6 6"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5l3-4H0l3 4z" fill={color} stroke="none"/>
        </svg>
    )
}

function getThumbnailIcon(type: LayerType): JSX.Element {
    switch (type) {
        case LayerType.FRAME:
            return <FrameThumbnailIcon/>
        case LayerType.GROUP:
            return <GroupThumbnailIcon/>
        case LayerType.RECTANGLE:
            return <RectangleThumbnailIcon/>
        default:
            return <FrameThumbnailIcon/>
    }
}

function FrameThumbnailIcon(props: {
    style?: React.CSSProperties
}) {
    const {style} = props
    const {color} = style ?? {color: "#000"}
    return (
        <svg className="svg" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 .5V3h4V.5h1V3h2.5v1H9v4h2.5v1H9v2.5H8V9H4v2.5H3V9H.5V8H3V4H.5V3H3V.5h1zM8 8V4H4v4h4z"
                  fill={color} stroke="none"/>
        </svg>
    )
}

function GroupThumbnailIcon(props: {
    style?: React.CSSProperties
}) {
    const {style} = props
    const {color} = style ?? {color: "#333333"}
    return (
        <svg className="svg" width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6 0H4v1h2V0zm2.5 9H9v-.5h1V10H8.5V9zM1 4v2H0V4h1zm8-2.5V1h-.5V0H10v1.5H9zM9 4v2h1V4H9zM1 1.5V1h.5V0H0v1.5h1zm-1 7h1V9h.5v1H0V8.5zM6 9H4v1h2V9z"
                fill={color} stroke="none"/>
        </svg>
    )
}

function RectangleThumbnailIcon(props: {
    style?: React.CSSProperties
}) {
    const {style} = props
    const {color} = style ?? {color: "#333333"}
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 3.5H10.5V8.5H1.5V3.5Z" stroke={color}/>
        </svg>
    )
}
