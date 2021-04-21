import { defineElement, setupDefaultRender } from '@atomify/hooks';
import { h, JSXRenderer } from '@atomify/jsx';
import { useStylesheet } from '@source/utilities/hooks/use-stylesheet';

setupDefaultRender(JSXRenderer);

import styles from './button.scss';

export const Button = () => {
    const test = Math.random();

    useStylesheet(styles);
    return <button>hello button {test}</button>;
};

defineElement('test-button', Button);
