export * from "./canvas-kit";

export function calcStep(scale: number) {
    // 一个大格子代表的宽度 100px
    // 0.5 < scale <= 1
    let representWidth = 100;

    if (scale <= 0.25) {
        // 非常小的时候，固定显示宽度 100
        representWidth = Math.floor(100 / scale / 10) * 10;
    }

    if (scale <= 0.5 && scale > 0.25) {
        representWidth = 200;
    }

    if (scale > 1 && scale <= 2) {
        representWidth = 50;
    }

    if (scale > 2 && scale <= 4) {
        representWidth = 20;
    }

    // 比较大的时候
    // 一个大格子固定代表 10 px，也就是一个小格子代表 1px
    if (scale > 4) {
        representWidth = 10;
    }

    return representWidth;
}
