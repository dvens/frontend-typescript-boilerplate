import { Loadable } from '@utilities/loadable';
import { isLocalhost, registerServiceWorker, unRegisterServiceWorker } from '@utilities/sw';

if (!isLocalhost) {
    unRegisterServiceWorker();
} else {
    registerServiceWorker();
}

Loadable({
    hook: 'counter-element',
    loader: () => import('@source/components/common/counter-element'),
    onLoaded: () => console.log('Counter Element loaded'),
});
