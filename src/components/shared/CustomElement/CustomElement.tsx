import { defineElement } from '@atomify/hooks';
import { h, Fragment } from '@atomify/jsx';

import styles from './CustomElement.client.css';

import { useStylesheet } from '@source/utilities/hooks/use-stylesheet';

const CustomElement = () => {
    useStylesheet(styles);
    return <Fragment>Hello World!!</Fragment>;
};

defineElement('custom-element', CustomElement, { useShadowDom: true });
