import { h } from '@atomify/jsx';

import styles from './button.module.css';

export const Button = () => {
    return (
        <button className={styles['c-button']}>
            <div className={styles['button__container']}>hello button!</div>
        </button>
    );
};
