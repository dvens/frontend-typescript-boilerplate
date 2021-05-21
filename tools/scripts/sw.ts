import fs from 'fs';
import { generateSW, injectManifest } from 'workbox-build';

import defaultConfig from '../config/config';

import getWorkboxConfig from '../utilities/get-workbox-config';

async function generateServiceWorker() {
    const workboxConfig = getWorkboxConfig();

    if (!defaultConfig.injectManifest) {
        const { count, size } = await generateSW(workboxConfig);
        console.log(`Generated, which will precache ${count} files, totaling ${size} bytes.`);
    } else {
        if (!workboxConfig.swSrc && fs.existsSync(workboxConfig.swSrc))
            throw new Error('Please add a valid Service Worker Source');

        const { count, size } = await injectManifest(workboxConfig);
        console.log(`Generated, which will precache ${count} files, totaling ${size} bytes.`);
    }
}

export default generateServiceWorker;
