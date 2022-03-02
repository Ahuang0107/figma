import * as React from "react";
import {Theme} from "../constants";

export const getColorPallet = (theme: Theme): React.CSSProperties => {
    const props = {} as CSSStyleDeclaration;

    for (const key of Object.keys(theme.palette)) {
        props[`${key}`] = theme.palette[key];
    }

    return props as React.CSSProperties;
};
