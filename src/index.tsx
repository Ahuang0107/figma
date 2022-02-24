import * as React from "react";
import {render} from "react-dom";
import App from "./page/app";
import {Provider} from "mobx-react";
import stores from "./store";
import "./style.scss";

render(
    <Provider {...stores}>
        <App/>
    </Provider>,
    document.getElementById("react-page")
)
