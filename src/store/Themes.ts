import {makeAutoObservable} from "mobx";
import {DEFAULT_THEME} from "../constants";

export class Themes {

    constructor() {
        makeAutoObservable(this);
    }

    getCurrentTheme = (): Themes.Theme => {
        return DEFAULT_THEME;
    };

}

export const themes = new Themes()
