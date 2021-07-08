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
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return `<test-button></test-button>${renderToString(<Button />)}`;
};

export const Primary = Template.bind({});
