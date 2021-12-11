import * as React from "react";

export const getColorPallet = (theme: Themes.Theme): React.CSSProperties => {
    const props = {} as CSSStyleDeclaration;

    for (const key of Object.keys(theme.palette)) {
        // @ts-ignore
        props[`${key}`] = theme.palette[key];
    }

    return props as React.CSSProperties;
};
