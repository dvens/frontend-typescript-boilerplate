import { h, renderToString } from '@atomify/jsx';

import { Button } from './Button';

export default {
    title: 'Shared/Button',
    argTypes: {
        label: { control: 'text' },
        primary: { control: 'boolean' },
        backgroundColor: { control: 'color' },
        size: {
            control: { type: 'select', options: ['small', 'medium', 'large'] },
        },
        onClick: { action: 'onClick' },
    },
};

const Template = () => {
    return `${renderToString(<Button />)}`;
};

export const Primary = Template.bind({});
