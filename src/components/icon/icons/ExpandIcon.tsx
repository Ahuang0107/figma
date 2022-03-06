import * as React from "react";

interface PropsType {
    style?: React.CSSProperties
}

export function ExpandIcon(props: PropsType) {
    const {style} = props
    const {color} = style ?? {color: "#000"}
    return (
        <svg style={{...style}} className="svg" width="6" height="6" viewBox="0 0 6 6"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5l3-4H0l3 4z" fill={color} stroke="none"/>
        </svg>
    )
}
