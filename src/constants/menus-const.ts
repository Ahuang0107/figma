import {Icons} from "../components";
import * as React from "react";

export enum ToolType {
    MOVE,
    FRAME,
    RECTANGLE,
    PEN,
    TEXT,
    HAND,
    COMMENT,
}

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

export const MenusConst: Menu[] = [
    new Menu(ToolType.MOVE, "MoveIcon", true),
    new Menu(ToolType.FRAME, "FrameIcon", true),
    new Menu(ToolType.RECTANGLE, "RectangleIcon", true),
    new Menu(ToolType.PEN, "PenIcon", true),
    new Menu(ToolType.TEXT, "TextIcon", true),
    new Menu(ToolType.HAND, "HandIcon", false),
    new Menu(ToolType.COMMENT, "CommentIcon", false),
]
