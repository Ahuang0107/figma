import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {SkyView} from "./view/demo/SkyView";
import {SkyModel} from "./view/demo/SkyModel";
import {CanvasKitPromised} from "./view/demo/CanvasKit";
import JSZip from "jszip";

export function Canvas() {
    const foreignRef = useRef<HTMLDivElement>()
    const [skyView, setSkyView] = useState<SkyView>()

    useEffect(() => {
        async function fetchData(): Promise<ArrayBuffer> {
            return await fetch("http://localhost:3000/docs/test.sketch").then(res => res.arrayBuffer())
        }

        Promise.all([CanvasKitPromised, fetchData()]).then(async ([, arrayBuffer]) => {
            let zipFile = await JSZip.loadAsync(arrayBuffer)

            const model = new SkyModel()
            await model.readZipFile(zipFile)
            console.log(model)
            SkyView.create(model, foreignRef.current).then(skyView => setSkyView(skyView))
        })

        window.addEventListener("resize", () => {
            // skyView.reSize();
        })
    }, [])

    return (
        <div ref={foreignRef}/>
    )
}
