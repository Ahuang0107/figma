import * as React from 'react';
import {ComponentMeta} from '@storybook/react';
import {Button} from "../renderer/elements/Button";
import {Icon} from "../renderer/elements";

export default {
    title: 'Example/Button',
    component: Button,
} as ComponentMeta<typeof Button>;

export const LightText = () => <Button type="primary">
    <Icon color="#000" type="Close" size="18"/>
</Button>
