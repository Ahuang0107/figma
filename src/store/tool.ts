import {createSlice} from '@reduxjs/toolkit';
import {ToolType} from "../constants/menus-const";

interface State {
    tool: ToolType
}

const initialState: State = {
    tool: ToolType.MOVE
}

export const toolSlice = createSlice({
    name: 'tool',
    initialState,
    reducers: {
        select: (state, action) => {
            return {
                ...state, tool: action.payload
            }
        }
    }
})
