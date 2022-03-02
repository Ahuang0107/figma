import {createSlice} from '@reduxjs/toolkit';
import {DEFAULT_THEME, Theme} from "../constants";

const initialState: Theme = DEFAULT_THEME

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {}
})
