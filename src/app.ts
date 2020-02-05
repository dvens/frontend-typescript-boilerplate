import { Loadable } from '@utilities/loadable';
import { registerServiceWorker, isLocalhost, unRegisterServiceWorker } from '@utilities/sw';

if (!isLocalhost) {
    unRegisterServiceWorker();
} else {
    registerServiceWorker();
}

Loadable({
    hook: 'counter-element',
    loader: () => import('@source/components/atoms/counter-element'),
    onLoaded: () => console.log('Counter Element loaded'),
});
