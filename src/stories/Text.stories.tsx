import * as React from 'react';
import {ComponentMeta} from '@storybook/react';

import {Text} from "../renderer/elements/Text";

export default {
    title: 'Example/Text',
    component: Text,
} as ComponentMeta<typeof Text>;

export const LightText = () => <Text color="light">General</Text>
export const InactiveText = () => <Text color="inactive">General</Text>
export const DarkText = () => <Text color="dark">General</Text>
export const TitleText = () => <Text type="title">General</Text>
export const SubtitleText = () => <Text type="subtitle">General</Text>
