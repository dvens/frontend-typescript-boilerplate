import { defineElement, setupDefaultRender } from '@atomify/hooks';
import { h, JSXRenderer } from '@atomify/jsx';

setupDefaultRender(JSXRenderer);

import styles from './button.module.css';

export const Button = () => {
    const test = Math.random();

    return (
        <button className={styles['c-button']}>
            <div className={styles['button__container']}>hello button{test}</div>
        </button>
    );
};

defineElement('test-button', Button);
