import * as React from "react";
import {inject} from "mobx-react";

@inject("themes")
class App extends React.Component {
    render() {
        return (
            <div id="body">
                successfully launched app!
            </div>
        )
    }
}

export default App;
