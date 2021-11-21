import {makeAutoObservable} from "mobx";

type Mode = "dark" | "light"

export class Themes {
    mode: Mode = "dark"

    constructor() {
        makeAutoObservable(this);
    }

    changeThemesMode = () => {
        this.mode = "light"
    }
}

export const themes = new Themes()
