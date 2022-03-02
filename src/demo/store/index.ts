import {configureStore} from '@reduxjs/toolkit';
import {counterSlice} from './counter-slice';

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
})
export const {increment, decrement} = counterSlice.actions

export type RootState = ReturnType<typeof store.getState>
