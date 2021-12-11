import * as React from "react";
import {inject, observer} from "mobx-react";
import {Themes} from "../stores/Themes";
import "./style.scss";
import {getColorPallet} from "../../utils/Render";

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

    render(): JSX.Element {
        const theme = this.props.themes.getCurrentTheme();
        const pallet = getColorPallet(theme);
        return (
            <div id="body" style={pallet}>
                {/*<div className="electron-top-panel"></div>*/}
                <div className="editor-tools-panel">
                    <div className="action"></div>
                    <div className="tools">
                        <div className="tool-multi-button">
      <span className="svg-end-button">
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M14.872 8.859L3.646 2.072l-.98-.592.231 1.121 2.683 13 .243 1.178.664-1.003 3.038-4.59 5.22-1.417 1.127-.306-1-.604zM4.108 3.52l9.247 5.59-4.274 1.16-.182.05-.104.156-2.479 3.746L4.108 3.52z"
              fill-rule="nonzero" fill-opacity="1" fill="#fff" stroke="none"/>
        </svg>
      </span>
                            <span className="unfold-button">
        <svg width="8" height="7" viewBox="0 0 8 7" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.646 5.354l-3-3 .708-.708L4 4.293l2.646-2.647.708.708-3 3L4 5.707l-.354-.353z" fill-rule="evenodd"
                fill-opacity="1" fill="#fff" stroke="none"/>
        </svg>
      </span>
                        </div>
                        <div className="tool-multi-button">
      <span className="svg-end-button">
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 16v-3H0v-1h3V4H0V3h3V0h1v3h8V0h1v3h3v1h-3v8h3v1h-3v3h-1v-3H4v3H3zm9-4V4H4v8h8z"
                  fill-rule="evenodd"
                  fill-opacity="1" fill="#fff" stroke="none"/>
        </svg>
      </span>
                            <span className="unfold-button">
        <svg width="8" height="7" viewBox="0 0 8 7" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.646 5.354l-3-3 .708-.708L4 4.293l2.646-2.647.708.708-3 3L4 5.707l-.354-.353z" fill-rule="evenodd"
                fill-opacity="1" fill="#fff" stroke="none"></path>
        </svg>
      </span>
                        </div>
                        <div className="tool-multi-button">
      <span className="svg-end-button">
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2v14H2V2h14zm0 15h1V1H1v16h15z" fill-rule="nonzero" fill-opacity="1" fill="#fff" stroke="none"/>
        </svg>
      </span>
                            <span className="unfold-button">
        <svg width="8" height="7" viewBox="0 0 8 7" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.646 5.354l-3-3 .708-.708L4 4.293l2.646-2.647.708.708-3 3L4 5.707l-.354-.353z" fill-rule="evenodd"
                fill-opacity="1" fill="#fff" stroke="none"></path>
        </svg>
      </span>
                        </div>
                        <div className="tool-multi-button">
      <span className="svg-end-button">
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M3.444 2.737l6.666 1.9.012.004.011.003C12.072 5.146 13.5 6.907 13.5 9c.003.503-.063.912-.211 1.367l-.185.58.43.43 1.865 1.866-2.12 2.121-1.848-1.847-.435-.435-.585.193c-.469.157-.891.228-1.411.225-2.171 0-3.985-1.539-4.407-3.586l-.008-.037-.01-.037-1.832-6.39 4.903 4.903C7.552 8.55 7.5 8.768 7.5 9c0 .828.672 1.5 1.5 1.5.828 0 1.5-.672 1.5-1.5 0-.828-.672-1.5-1.5-1.5-.232 0-.45.052-.647.146l-4.91-4.91zm9.834 14.041l3.536-3.535-2.572-2.572c.167-.527.258-1.089.258-1.671 0-2.56-1.748-4.71-4.115-5.324L1 1l2.613 9.116C4.13 12.618 6.345 14.5 9 14.5c.602 0 1.182-.097 1.724-.276l2.554 2.554z"
              fill-rule="nonzero" fill-opacity="1" fill="#fff" stroke="none"/>
        </svg>
      </span>
                            <span className="unfold-button">
        <svg width="8" height="7" viewBox="0 0 8 7" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.646 5.354l-3-3 .708-.708L4 4.293l2.646-2.647.708.708-3 3L4 5.707l-.354-.353z" fill-rule="evenodd"
                fill-opacity="1" fill="#fff" stroke="none"></path>
        </svg>
      </span>
                        </div>
                        <div className="tool-button">
      <span className="svg-center-button">
        <svg className="svg" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5h1V2h5v14H5v1h7v-1H9V2h5v3h1V1H2v4z" fill-rule="nonzero" fill-opacity="1" fill="#fff"
                stroke="none"/>
        </svg>
      </span>
                        </div>
                        <div className="tool-button">
      <span className="svg-center-button">
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M2.026 12.382c-.518-.487-.57-1.308-.118-1.856.435-.527 1.191-.62 1.74-.216l1.347.996 1 .739V4c0-.552.448-1 1-1 .553 0 1 .448 1 1v5h1V2c0-.552.448-1 1-1 .553 0 1 .448 1 1v7h1V3c0-.552.448-1 1-1 .553 0 1 .448 1 1v6h1V6c0-.552.448-1 1-1 .553 0 1 .448 1 1v8c0 2.762-2.238 5-5 5h-1c-1.553 0-2.94-.708-3.858-1.82-.036-.028-.071-.06-.106-.092l-5.005-4.706zm4.4 5.507l-.08-.072-5.005-4.706c-.902-.848-.993-2.267-.204-3.221.772-.936 2.127-1.106 3.105-.384l.753.557V4c0-1.104.896-2 2-2 .365 0 .706.097 1 .268V2c0-1.105.896-2 2-2 .873 0 1.615.559 1.888 1.338.318-.214.7-.338 1.112-.338 1.105 0 2 .895 2 2v1.268c.295-.17.636-.268 1-.268 1.105 0 2 .896 2 2v8c0 3.314-2.686 6-6 6h-1c-1.83 0-3.47-.821-4.57-2.111z"
              fill-rule="evenodd" fill-opacity="1" fill="#fff" stroke="none"></path>
        </svg>
      </span>
                        </div>
                        <div className="tool-button">
      <span className="svg-center-button">
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M1.944 16.75l1.696-2.758.287-.465-.237-.493c-.465-.951-.697-1.91-.69-3.034 0-3.866 3.134-7 7-7 3.866 0 7 3.134 7 7 0 3.866-3.134 7-7 7-1.14.007-2.112-.232-3.074-.709l-.268-.131-.296.037-4.418.552zm4.543.44c1.06.518 2.253.81 3.513.81 4.418 0 8-3.582 8-8 0-4.418-3.582-8-8-8-4.418 0-8 3.582-8 8 0 1.243.283 2.419.789 3.468l-2.117 3.44L0 18l1.272-.159 5.215-.652z"
              fill-rule="nonzero" fill-opacity="1" fill="#fff" stroke="none"></path>
        </svg>
      </span>
                        </div>
                    </div>
                    <div className="title"></div>
                    <div className="function"></div>
                </div>
                <div className="editor-edit-panel">
                    <div className="layout-manager-panel"></div>
                    <div className="canvas-panel"></div>
                    <div className="property-panel"></div>
                </div>
            </div>
        )
    }
}

export default App;
