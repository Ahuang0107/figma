export interface Palette {
    "--color-bg-top-panel": string;
    "--color-bg-tools-panel": string;
    "--color-border": string;

    [index: string]: string;
}

export const DEFAULT_PALETTE: Palette = {
    "--color-bg-top-panel": "#222222",
    "--color-bg-tools-panel": "#2c2c2c",
    "--color-border": "#e5e5e5",
};

export interface Theme {
    id: number
    palette: Palette
}

export const DEFAULT_THEME = {
    id: 0,
    palette: DEFAULT_PALETTE,
};
