import * as CanvasKitInitFn from "canvaskit-wasm";
import {CanvasKit, FontMgr, ParagraphBuilder, ParagraphStyle} from "canvaskit-wasm";
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

interface Color {
    GREY: Float32Array
    WHITE: Float32Array
    BLUE: Float32Array
    PURE_BLACK: Float32Array
    BLUEISH_BLACK: Float32Array
}

export let Color: Color;

export function initCanvasKitAndFont() {
    return CanvasKitPromised.then(() => {
        Color = {
            GREY: sk.CanvasKit.Color(53, 53, 53),
            WHITE: sk.CanvasKit.Color(255, 255, 255),
            BLUE: sk.CanvasKit.Color(24, 160, 251),
            PURE_BLACK: sk.CanvasKit.Color(0, 0, 0),
            BLUEISH_BLACK: sk.CanvasKit.Color(20, 20, 44),
        }
        return getFontMgr()
    });
}

export class ParagraphFactory {
    static createParagraph(paraStyle: ParagraphStyle): ParagraphBuilder {
        return sk.CanvasKit.ParagraphBuilder.Make(paraStyle, fontMgr);
    }
}

export default sk;
