import {app, BrowserWindow} from "electron";

class App {
    constructor() {
        app.whenReady().then(() => {
            const win = new BrowserWindow({
                width: 800,
                height: 600
            })

            win.loadFile('../renderer/index.html').then(() => {
            })
        })
    }
}

export default (): void => {
    new App();
}
