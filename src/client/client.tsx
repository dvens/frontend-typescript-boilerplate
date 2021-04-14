import '@source/styles/main.scss';
import '../polyfills';
import '@/components/shared/Button';

import { h, hydrate } from '@atomify/jsx';
import App from '@pages/_app';
import { isLocalhost, registerServiceWorker, unRegisterServiceWorker } from '@utilities/sw';

if (!isLocalhost) {
    unRegisterServiceWorker();
} else {
    registerServiceWorker();
}

hydrate(<App />, document.body);

if (module.hot) {
    module.hot.accept();
}
