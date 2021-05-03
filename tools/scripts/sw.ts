import fs from 'fs';
import { generateSW, injectManifest } from 'workbox-build';

import globalConfig from '../utilities/get-config';
import getWorkboxConfig from '../utilities/get-workbox-config';

const { config } = globalConfig;

async function generateServiceWorker() {
    const workboxConfig = getWorkboxConfig();

    if (!config.injectManifest) {
        const { swDest, count, size } = await generateSW(workboxConfig);
        console.log(
            `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`,
        );
    } else {
        if (!workboxConfig.swSrc && fs.existsSync(workboxConfig.swSrc))
            throw new Error('Please add a valid Service Worker Source');

        const { swDest, count, size } = await injectManifest(workboxConfig);
        console.log(
            `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`,
        );
    }
}

export default generateServiceWorker;
