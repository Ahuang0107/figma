import {action, computed, observable} from "mobx";

type Mode = "dark" | "light"

export class Themes {
    @observable mode: Mode = "dark"

    constructor() {
    }

    @computed get isDark() {
        return this.mode == "dark"
    }

    @action
    changeThemesMode = () => {
        this.mode = "light"
    }
}

export const themes = new Themes()

const stores = {
    themes
}

export default stores
