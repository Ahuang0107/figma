import * as React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {LayerItem} from "../components/layer-item";

export default {
    title: "Component/LayerItem",
    component: LayerItem,
} as ComponentMeta<typeof LayerItem>

const Template: ComponentStory<typeof LayerItem> = (args) => <LayerItem data={args.data}/>

export const Primary = Template.bind({})
Primary.args = {
    data: {
        id: "10",
        type: "RECTANGLE",
        name: "rectangle",
    }
}

export const Secondary = Template.bind({})
Secondary.args = {
    data: {
        id: "30",
        type: "GROUP",
        name: "group",
        subLayers: [
            {
                id: "40",
                type: "RECTANGLE",
                name: "rectangle",
            },
            {
                id: "50",
                type: "RECTANGLE",
                name: "rectangle",
            },
        ]
    },
}
