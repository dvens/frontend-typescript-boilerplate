import './components';

import { h, hydrate } from '@atomify/jsx';
import App from '@pages/_app';
import { routeConfig } from '@pages/routes';
import { isLocalhost, registerServiceWorker, unRegisterServiceWorker } from '@utilities/sw';

if (!isLocalhost) {
    unRegisterServiceWorker();
} else {
    registerServiceWorker();
}

if (module.hot) {
    module.hot.accept(['@pages/routes', './components'], () => {
        hydrate(
            <App location={window.location.pathname} routeConfig={routeConfig} />,
            document.getElementById('app')!,
        );
    });
}
