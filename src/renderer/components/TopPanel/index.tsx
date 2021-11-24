import * as React from "react";

import Panel from "./toppanel";
import "./style.scss";

interface TopPanelProps {
}

interface TopPanelStates {
    isMaximized: boolean;
}

class TopPanel extends React.Component<TopPanelProps, unknown> {
    props: TopPanelProps;
    state: TopPanelStates;

    constructor(props: TopPanelProps) {
        super(props);

        this.props = props;
        this.state = {isMaximized: false};
    }

    render(): JSX.Element {
        return (
            <Panel
                miniw={() => {
                }}
                maxiw={() => {
                }}
                closew={() => {
                }}
                scalePanel={1}
                visibleNewProjectBtn={true}
                current={0}
                onNewProject={() => {
                }}
                onMainTab={() => {
                }}
                openMenu={() => {
                }}
                newTab={() => {
                }}
                isMaximized={this.state.isMaximized}
            />
        );
    }
}

export default TopPanel;
