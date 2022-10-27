import * as CanvasKitInitFn from "canvaskit-wasm";
import {CanvasKit} from "canvaskit-wasm";

const CanvasKitInit = require('canvaskit-wasm/bin/canvaskit.js');

const sk = {} as {
    CanvasKit: CanvasKit;
};

export const CanvasKitPromised = CanvasKitInit()
    .then((CanvasKit: CanvasKitInitFn.CanvasKit) => {
        sk.CanvasKit = CanvasKit;
        (window as any).CanvasKit = CanvasKit;
        return sk.CanvasKit;
    }) as Promise<CanvasKit>;

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
        return
    });
}

export default sk;
