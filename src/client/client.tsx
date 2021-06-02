import '@/polyfills';
import './setup';
import '@components/shared/Button';
import '@components/features/Router/client-router';

import { h, hydrate, render } from '@atomify/jsx';
import App from '@pages/_app';
import { isLocalhost, registerServiceWorker, unRegisterServiceWorker } from '@utilities/sw';

if (!isLocalhost) {
    unRegisterServiceWorker();
} else {
    registerServiceWorker();
}

if (module.hot) {
    hydrate(<App location={window.location.pathname} />, document.getElementById('app')!);
    module.hot.accept();
}
