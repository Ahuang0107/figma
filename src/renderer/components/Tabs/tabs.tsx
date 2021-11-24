import * as React from "react";
import {MicrophoneIcon} from "./microphoneIcon";
import {Button, Icon, Text} from "../../elements";

interface Tab {
    id: number;
    title?: string;
    url?: string;
    showBackBtn?: boolean;
    moves?: boolean;
    fileKey?: string;
    order?: number;
    focused?: boolean;
    isUsingMicrophone?: boolean;
    isInVoiceCall?: boolean;
}

interface Props {

}

const Tabs: React.FunctionComponent<Props> = () => {
    const tabs: Array<Tab> = [
        {
            id: 1,
            title: "111",
            showBackBtn: true,
            moves: false,
            isUsingMicrophone: false,
            isInVoiceCall: false,
        },
        {
            id: 2,
            title: "222",
            showBackBtn: true,
            moves: false,
            isUsingMicrophone: false,
            isInVoiceCall: false,
        },
    ]
    const current = 1
    return (
        <div className="tabBar">
            {tabs.map((t: Tab, i: number) => (
                <div
                    key={i}
                    className={`tab ${current === t.id ? "tab_active" : ""}`}
                    onClick={() => {
                    }}
                    onAuxClick={() => {
                    }}
                >
                    <Text className="tab__text pointer_events_none">{t.title}</Text>
                    <MicrophoneIcon isUsingMicrophone={t.isUsingMicrophone} isInVoiceCall={t.isInVoiceCall}/>
                    <Button className="tab__close button_clear" onClick={(): void => {
                    }}>
                        <Icon
                            color={`${current === t.id ? "var(--fg-tab-active)" : "var(--fg-tab)"}`}
                            type="CloseTab"
                            size="14"
                        />
                    </Button>
                </div>
            ))}
        </div>
    )
}
export default Tabs;
