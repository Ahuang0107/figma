import * as E from "electron";
import WindowManager from "./window/WindowManager";

class App {
    windowManager: WindowManager;

    constructor() {
        this.appEvent();
    }

    private appEvent = (): void => {
        E.app.whenReady().then(this.ready)
        E.app.on("window-all-closed", this.onWindowAllClosed);
    }
    private ready = (): void => {
        this.windowManager = WindowManager.instance;
    }
    private onWindowAllClosed = (): void => {
        E.app.quit();
    };
}

export default (): void => {
    new App();
}
