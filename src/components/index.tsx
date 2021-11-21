import * as React from "react";
import {inject, observer} from "mobx-react";
import {Themes} from "../stores";

interface AppProps {
    themes?: Themes
}

@inject("themes")
@observer
class App extends React.Component<AppProps> {
    props: AppProps

    constructor(props: AppProps) {
        super(props);
        this.props = props;
    }

    componentWillReceiveProps(nextProps: AppProps) {
        console.log(nextProps)
    }

    render(): JSX.Element {
        return (
            <div id="body">
                successfully launched app!
                default themes is {this.props.themes.mode}
                <button onClick={this.props.themes.changeThemesMode}>click themes change button</button>
            </div>
        )
    }
}

export default App;
