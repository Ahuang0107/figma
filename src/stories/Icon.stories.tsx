import * as React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Icon} from "../renderer/elements";

export default {
    title: 'Example/Icon',
    component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Home = Template.bind({});
Home.args = {
    color: '#000',
    type: 'Home',
    size: '18'
};
export const Plus = Template.bind({});
Plus.args = {
    color: '#000',
    type: 'Plus',
    size: '15'
};
export const MenuCorner = Template.bind({});
MenuCorner.args = {
    color: '#000',
    type: 'MenuCorner',
    size: '14'
};
export const Minimize = Template.bind({});
Minimize.args = {
    color: '#000',
    type: 'Minimize',
    size: '16'
};
export const Restore = Template.bind({});
Restore.args = {
    color: '#000',
    type: 'Restore',
    size: '16'
};
export const Maximize = Template.bind({});
Maximize.args = {
    color: '#000',
    type: 'Maximize',
    size: '16'
};
export const Close = Template.bind({});
Close.args = {
    color: '#000',
    type: 'Close',
    size: '16'
};
