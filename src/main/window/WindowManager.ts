import * as E from "electron";

class WindowManager {
    mainWindow: E.BrowserWindow;

    constructor() {
        const options: E.BrowserWindowConstructorOptions = {
            width: 1200,
            height: 900,
            frame: false,
            resizable: true,
            webPreferences: {
                sandbox: false,
                zoomFactor: 1,
                nodeIntegration: true,
                nodeIntegrationInWorker: false,
                webviewTag: false,
                webSecurity: false,
                webgl: true,
                experimentalFeatures: true,
                contextIsolation: false,
            },
        };
        this.mainWindow = new E.BrowserWindow(options);
        this.mainWindow.loadFile('../renderer/index.html').then(() => {
        })
    }

    private static _instance: WindowManager;
    static get instance(): WindowManager {
        if (WindowManager._instance) {
            return WindowManager._instance;
        }

        WindowManager._instance = new WindowManager();

        return WindowManager._instance;
    }

}

export default WindowManager;

