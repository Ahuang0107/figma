import * as React from "react";
import {render} from "react-dom";
import {Editor} from "./page";
import "./style.scss";
import {Provider} from "react-redux";
import {store} from "./store";

render(
    <React.StrictMode>
        <Provider store={store}>
            <Editor/>
        </Provider>
    </React.StrictMode>,
    document.getElementById("react-page")
)
