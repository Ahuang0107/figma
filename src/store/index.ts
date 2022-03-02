import {configureStore} from '@reduxjs/toolkit';
import {toolSlice} from "./tool";
import {themeSlice} from "./theme";

export const store = configureStore({
    reducer: {
        themeSelector: themeSlice.reducer,
        toolSelector: toolSlice.reducer
    }
})

export const {select} = toolSlice.actions

export type RootState = ReturnType<typeof store.getState>
