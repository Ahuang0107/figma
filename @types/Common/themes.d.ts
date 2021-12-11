declare namespace Themes {
    interface Theme {
        name: string;
        author: string;
        id: string;
        url?: string;
        palette: Palette;
    }

    interface Palette {
        "--color-bg-top-panel": string;
        "--color-bg-tools-panel": string;
        "--color-border": string;

        [index: string]: string;
    }
}
