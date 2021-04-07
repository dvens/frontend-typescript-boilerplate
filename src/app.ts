import { isLocalhost, registerServiceWorker, unRegisterServiceWorker } from '@utilities/sw';

if (!isLocalhost) {
    unRegisterServiceWorker();
} else {
    registerServiceWorker();
}

import '@/components/shared/Button';
