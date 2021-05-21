import '@/polyfills';
import '@components/shared/Button';

import { h, hydrate } from '@atomify/jsx';
import { matcher } from '@components/features/Router';
import App from '@pages/_app';
import { isLocalhost, registerServiceWorker, unRegisterServiceWorker } from '@utilities/sw';

if (!isLocalhost) {
    unRegisterServiceWorker();
} else {
    registerServiceWorker();
}

if (module.hot) {
    hydrate(<App />, document.getElementById('app')!);
    module.hot.accept();
}

console.log(
    matcher('/posts(/:id)(/)', {
        url: '/posts',
        regex: {
            id: /^\d+$/,
        },
    }),
);
