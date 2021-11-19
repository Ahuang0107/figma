import {observable} from "mobx";

class Themes {
    @observable mode: "dark" | "light";
}

const themes = new Themes()

const stores = {
    themes
}

export default stores
