import * as React from "react";
import {Icon, Icons} from "../icon";
import "./style.scss";

export interface ButtonProps extends WithFoldButtonProps {
    withFold: boolean,
}

export class Button extends React.Component<ButtonProps> {

    constructor(props: ButtonProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            this.props.withFold ?
                <ButtonWithFold icon={this.props.icon}
                                isActive={this.props.isActive}
                                onClick={this.props.onClick}
                                onFoldClick={this.props.onFoldClick}/> :
                <ButtonWithoutFold icon={this.props.icon}
                                   isActive={this.props.isActive}
                                   onClick={this.props.onClick}/>
        )
    }
}

interface WithFoldButtonProps extends BaseButtonProps {
    onFoldClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

const ButtonWithFold = (props: WithFoldButtonProps) => {
    return (
        <div className={`tool-multi-button ${props.isActive ? "tool-button-active" : ""}`}>
            <span className="svg-end-button" onClick={props.onClick}>
                <Icon type={props.icon}/>
            </span>
            <span className="unfold-button" onClick={props.onFoldClick}>
                <Icon type={"UnfoldIcon"}/>
            </span>
        </div>
    )
}

interface BaseButtonProps {
    icon?: Icons,
    isActive?: boolean,

    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

const ButtonWithoutFold = (props: BaseButtonProps) => {
    return (
        <div className={`tool-button ${props.isActive ? "tool-button-active" : ""}`}>
            <span className="svg-center-button" onClick={props.onClick}>
                <Icon type={props.icon}/>
            </span>
        </div>
    )
}

