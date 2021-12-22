import * as React from "react";
import {Icon, Icons} from "../Icon";
import "./style.scss";

export interface ButtonProps {
    multiIcon?: Icons,
    icon?: Icons,

    onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

export class Button extends React.Component<ButtonProps> {
    isActive: boolean = false;

    constructor(props: ButtonProps) {
        super(props);
    }

    render(): JSX.Element {
        let button: JSX.Element = <></>
        if (this.props.multiIcon) {
            button = <div className="tool-multi-button">
                <span className="svg-end-button" onClick={this.props.onClick}>
                    <Icon type={this.props.multiIcon}/>
                </span>
                <span className="unfold-button">
                    <Icon type={"UnfoldIcon"}/>
                </span>
            </div>
        } else if (this.props.icon) {
            button = <div className="tool-button">
                <span className="svg-center-button" onClick={this.props.onClick}>
                    <Icon type={this.props.icon}/>
                </span>
            </div>
        }
        return (
            button
        )
    }
}
