export interface Layer {
    id: string
    type: LayerType
    name: string
    subLayers?: Layer[]
}

export enum LayerType {
    FRAME = "FRAME",
    GROUP = "GROUP",
    RECTANGLE = "RECTANGLE",
}
