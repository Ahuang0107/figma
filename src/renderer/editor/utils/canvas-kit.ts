import * as CanvasKitInitFn from "@skeditor/canvaskit-wasm";
import {CanvasKit, TypefaceFontProvider} from "@skeditor/canvaskit-wasm";
import "../../../assets/fonts/Roboto-Regular.ttf";
import {Subject} from "rxjs";

const CanvasKitInit = require('@skeditor/canvaskit-wasm/bin/canvaskit.js');

const sk = {} as {
    CanvasKit: CanvasKit;
};

export const CanvasKitPromised = CanvasKitInit()
    .then((CanvasKit: CanvasKitInitFn.CanvasKit) => {
        sk.CanvasKit = CanvasKit;
        (window as any).CanvasKit = CanvasKit;
        fontProvider = sk.CanvasKit.TypefaceFontProvider.Make();
        return sk.CanvasKit;
    });

let fontProvider: TypefaceFontProvider | undefined;

export const fontLoaded = new Subject<string>();

const URL_Roboto = "./fonts/Roboto-Regular.ttf";
export const defaultFonts = ["Roboto"];
const defaultFontFiles = [URL_Roboto];

export function getFontProvider() {
    return fontProvider!;
}

function prefetchFonts() {
    defaultFontFiles.forEach((filename, idx) => {
        Promise.all([fetch(filename), CanvasKitPromised])
            .then(([res]) => res.arrayBuffer())
            .then((buffer) => {
                const fontName = defaultFonts[idx];
                fontProvider!.registerFont(buffer, fontName);
                fontLoaded.next(fontName);
            });
    });
}

// todo 暂时用不着draw para，所以不需要专门加载字体进来了
// prefetchFonts();

export default sk;
