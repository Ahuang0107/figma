import * as React from "react";
import {inject, observer} from "mobx-react";
import {Themes} from "../stores/Themes";
import TopPanel from "./TopPanel";
import "./style.scss";
import {getColorPallet} from "../../utils/Render";

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
        const theme = this.props.themes.getCurrentTheme();
        const pallet = getColorPallet(theme);

        const View = viewMap["TopPanel"];
        return (
            <div id="body" style={pallet}>
                <View/>
            </div>
        )
    }
}

export default App;
