import * as React from "react";
import {CanvasKitPromised} from "../editor/utils";

export function App() {
    CanvasKitPromised.then((CanvasKit) => {
        console.log(CanvasKit)
    })
    return (
        <>react</>
    )
}
