import * as E from "electron";
import {URL} from "url";
import * as path from "path";

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
        if (process.env.NODE_ENV === 'development') {
            const port = process.env.PORT || 12000;
            const url = new URL(`http://localhost:${port}`);
            url.pathname = 'index.html';
        }
        this.mainWindow.loadURL(this.resolveHtmlPath('index.html')).then(() => {
        })
    }

    private resolveHtmlPath = (htmlFileName: string) => {
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'development') {
            const port = process.env.PORT;
            const url = new URL(`http://localhost:${port}`);
            url.pathname = htmlFileName;
            return url.href;
        } else {
            const rootFolder = process.cwd();
            return `file://${path.resolve(rootFolder, 'dist/renderer/', htmlFileName)}`;
        }
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

