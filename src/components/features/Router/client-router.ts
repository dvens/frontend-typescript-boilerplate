import { defineElement, useElement, useListen } from '@atomify/hooks';

const RouterLink = () => {
    const anchor = useElement<HTMLAnchorElement>('a');

    useListen(anchor, 'click', (e: MouseEvent) => {
        e.preventDefault();
        console.log(anchor, 'clicked');
    });

    return null;
};

defineElement('router-link', RouterLink);
