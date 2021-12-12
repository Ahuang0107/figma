import * as CanvasKitInitFn from "canvaskit-wasm";
import {CanvasKit, FontMgr} from "canvaskit-wasm";
import "../../../assets/fonts/Roboto-Regular.ttf";
import "../../../assets/fonts/HarmonyOSSansSC-Regular.ttf";
import "../../../assets/fonts/colorfulemoji.woff2";

let canvasKitWasm = require("!!file-loader!canvaskit-wasm/bin/canvaskit.wasm");
canvasKitWasm = canvasKitWasm.default || canvasKitWasm;

const sk = {} as {
    CanvasKit: CanvasKit;
};

const CanvasKitPromised = (CanvasKitInitFn as any)({
    locateFile: canvasKitWasm && (() => canvasKitWasm)
}).then((CanvasKit: CanvasKitInitFn.CanvasKit) => {
    sk.CanvasKit = CanvasKit;
    (window as any).CanvasKit = CanvasKit;
    return sk.CanvasKit;
});

export let fontMgr: FontMgr | undefined;

export const defaultFonts = ["Roboto-Regular"];

const URL_Roboto = "./fonts/Roboto-Regular.ttf";
const URL_HarmonyOSSansSC = "./fonts/HarmonyOSSansSC-Regular.ttf";
const URL_ColorFulEmoji = "./fonts/colorfulemoji.woff2";

const getFontMgr = () => {
    if (fontMgr) {
        return Promise.resolve(fontMgr!);
    }
    return Promise.all([URL_Roboto, URL_HarmonyOSSansSC, URL_ColorFulEmoji].map((url) =>
        fetch(url).then((res) => res.arrayBuffer())
    ))
        .then((fonts) => {
            fontMgr = sk.CanvasKit.FontMgr.FromData(...fonts)!;

            // fonts.forEach((_, i) => {
            //     console.log(">>> Font name: ", fontMgr?.getFamilyName(i));
            // });
            return fontMgr!;
        });
};

export function initCanvasKitAndFont() {
    return CanvasKitPromised.then(() => getFontMgr());
}

export default sk;
