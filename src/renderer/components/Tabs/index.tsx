import * as React from "react";

import TabList from "./tabs";
import "./style.scss";

interface TabsProps {
}

class Tabs extends React.Component<TabsProps, unknown> {
    props: TabsProps;

    constructor(props: TabsProps) {
        super(props);

        this.props = props;
    }

    render(): JSX.Element {
        return (
            <TabList/>
        );
    }
}

export default Tabs;
