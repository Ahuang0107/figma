import * as React from "react";
import {render} from "react-dom";
import {Provider} from "mobx-react";
import App from "./components";
import stores from "./stores";

render(
    <Provider {...stores}>
        <App/>
    </Provider>,
    document.getElementById("root")
)
