import type {
    Canvas as SkCanvas,
    CanvasKit,
    Color as SkColor,
    GrDirectContext as SkGrDirectContext,
    Image as SkImage,
    Paint as SkPaint,
    Path as SkPath,
    Surface as SkSurface,
} from '@skeditor/canvaskit-wasm';

const CanvasKitInit = require('canvaskit-wasm/bin/canvaskit.js');

const sk = {} as {
    CanvasKit: CanvasKit;
};

export const CanvasKitPromised = CanvasKitInit()
    .then((CanvasKit: CanvasKit) => {
        sk.CanvasKit = CanvasKit;
        (window as any).CanvasKit = CanvasKit;
        return sk.CanvasKit;
    });

export default sk;

export {
    SkSurface,
    SkCanvas,
    SkImage,
    SkPath,
    SkColor,
    SkPaint,
    SkGrDirectContext
}
