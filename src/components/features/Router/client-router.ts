import { defineElement, useElement, useListen, useWatch } from '@atomify/hooks';

import { useHistory } from './history';

function isModifiedEvent(event: MouseEvent) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

const RouterLink = () => {
    const anchor = useElement<HTMLAnchorElement>('a');
    const { navigate } = useHistory({ base: '' });

    useListen(anchor, 'click', (event: MouseEvent) => {
        const { target, href } = anchor.current!;

        if (
            !event.defaultPrevented &&
            event.button === 0 &&
            (!target || target === '_self') &&
            !isModifiedEvent(event)
        ) {
            event.preventDefault();

            // TODO Implement navigate
            navigate(href);
        }
    });

    return null;
};

defineElement('router-link', RouterLink);

const RouterOutlet = () => {
    const { historyState } = useHistory({ base: '' });

    useWatch(() => {
        console.log(historyState.path);
    });

    return null;
};

defineElement('router-outlet', RouterOutlet);
