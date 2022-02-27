import {makeAutoObservable} from "mobx";

export class Tools {
    selectedTool: ToolType = ToolType.MOVE;

    constructor() {
        makeAutoObservable(this);
    }

    select(tool: ToolType) {
        this.selectedTool = tool;
    }

}

export enum ToolType {
    MOVE,
    FRAME,
    RECTANGLE,
    PEN,
    TEXT,
    HAND,
    COMMENT,
}

export const tools = new Tools()
