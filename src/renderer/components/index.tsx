import * as React from "react";
import {inject, observer} from "mobx-react";
import {Themes} from "../stores/Themes";
import TopPanel from "./TopPanel";
import "./style.scss";

interface AppProps {
    themes?: Themes
}

const viewMap = {
    TopPanel,
};

@inject("themes")
@observer
class App extends React.Component<AppProps> {
    props: AppProps

    constructor(props: AppProps) {
        super(props);
        this.props = props;
    }

    render(): JSX.Element {
        const View = viewMap["TopPanel"];
        return (
            <div id="body">
                <View/>
            </div>
        )
    }
}

export default App;
