import * as React from "react";

interface PropsType {
    style?: React.CSSProperties
}

export function FrameThumbnailIcon(props: PropsType) {
    const {style} = props
    const {color} = style ?? {color: "#000"}
    return (
        <svg className="svg" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 .5V3h4V.5h1V3h2.5v1H9v4h2.5v1H9v2.5H8V9H4v2.5H3V9H.5V8H3V4H.5V3H3V.5h1zM8 8V4H4v4h4z"
                  fill={color} stroke="none"/>
        </svg>
    )
}
