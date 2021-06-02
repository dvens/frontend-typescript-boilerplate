import { defineElement } from '@atomify/hooks';
import { Fragment, h } from '@atomify/jsx';

import styles from './button.module.css';

export const Button = () => {
    const test = Math.random();

    return (
        <button className={styles['c-button']}>
            <div className={styles['button__container']}>hello button!{test}</div>
        </button>
    );
};

defineElement('test-button', Button, { useShadowDom: true });
