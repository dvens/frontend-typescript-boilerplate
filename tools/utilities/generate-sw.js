const { generateSW } = require('workbox-build');
const getWorkboxConfig = require('./get-workbox-config');

async function generateServiceWorker() {
    const { swDest, count, size } = await generateSW(getWorkboxConfig());
    console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
}

module.exports = generateServiceWorker;
