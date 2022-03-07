import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {initCanvasKitAndFont} from "./utils";
import {CanvasView} from "./view/canvas-view";
import axios from "axios";
import {Page} from "./view/page";

export function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>()
    const [skyView, setSkyView] = useState<CanvasView>()
    const [pages, setPages] = useState<Page[]>([])

    useEffect(() => {
        async function fetchData() {
            return await axios.get("http://localhost:3000/page/1").then(res => res.data)
        }

        Promise.all([initCanvasKitAndFont(), fetchData()]).then(([, data]) => {
            setSkyView(new CanvasView(canvasRef.current))
            setPages(data)
        })

        window.addEventListener("resize", () => {
            skyView.reSize();
        })
    }, [])

    return (
        <canvas ref={canvasRef} style={{position: "absolute", userSelect: "none"}}/>
    )
}
