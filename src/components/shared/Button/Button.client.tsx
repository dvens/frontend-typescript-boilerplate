import { defineElement, setupDefaultRender } from '@atomify/hooks';
import { h, JSXRenderer } from '@atomify/jsx';

setupDefaultRender(JSXRenderer);

export const Button = () => {
    const test = Math.random();
    return <button>hello button {test}</button>;
};

defineElement('test-button', Button);
