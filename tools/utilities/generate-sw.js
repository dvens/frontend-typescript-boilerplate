const fs = require('fs');

const { generateSW, injectManifest } = require('workbox-build');
const getWorkboxConfig = require('./get-workbox-config');

const { config } = require('./get-config');

async function generateServiceWorker() {
    const workboxConfig = getWorkboxConfig();

    console.log(config.offlineSupport, config.swSrc);

    if (!config.offlineSupport) {
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

module.exports = generateServiceWorker;
