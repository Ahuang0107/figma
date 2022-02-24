import * as CanvasKitInitFn from "canvaskit-wasm";

const CanvasKitInit = require('canvaskit-wasm/bin/canvaskit.js');

export const CanvasKitPromised = CanvasKitInit()
    .then((CanvasKit: CanvasKitInitFn.CanvasKit) => {
        return CanvasKit
    });
