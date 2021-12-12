import {MoveIcon} from "./icons/MoveIcon";
import {UnfoldIcon} from "./icons/UnfoldIcon";
import {FrameIcon} from "./icons/FrameIcon";
import {RectangleIcon} from "./icons/RectangleIcon";
import {PenIcon} from "./icons/PenIcon";
import {TextIcon} from "./icons/TextIcon";
import {HandIcon} from "./icons/HandIcon";
import {CommentIcon} from "./icons/CommentIcon";
import * as React from "react";

export type Icons =
    | "MoveIcon"
    | "UnfoldIcon"
    | "FrameIcon"
    | "RectangleIcon"
    | "PenIcon"
    | "TextIcon"
    | "HandIcon"
    | "CommentIcon";

export interface IconProps {
    type: Icons;
}

export class Icon extends React.Component<IconProps> {
    private iconsMap = {
        MoveIcon,
        UnfoldIcon,
        FrameIcon,
        RectangleIcon,
        PenIcon,
        TextIcon,
        HandIcon,
        CommentIcon,
    };

    constructor(props: IconProps) {
        super(props);
    }

    render(): JSX.Element {
        const IconView = this.iconsMap[this.props.type];
        return (
            <IconView/>
        )
    }
}
