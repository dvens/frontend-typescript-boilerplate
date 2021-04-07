import { defineElement } from '@atomify/hooks';

export const Button = () => {
    return '<button>hello button</button>';
};

defineElement('test-button', Button);
