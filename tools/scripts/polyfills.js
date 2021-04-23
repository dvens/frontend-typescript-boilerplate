const fs = require('fs');
const prettier = require('prettier');

const getPolyfills = require('../utilities/polyfill-loader/get-polyfills');
const createLoaderScript = require('../utilities/polyfill-loader/loader-script');
const copyPolyfills = require('../utilities/copy-polyfills');
const { config } = require('../utilities/get-config');

async function generatePolyfills() {
    const polyfills = getPolyfills(config);
    const script = await createLoaderScript(config, polyfills);

    const formatted = prettier.format(
        `
        import { Fragment, h } from '@atomify/jsx';

        export const renderScripts = () => {
            return (<Fragment>${script}</Fragment>);
        };
    `,
        { parser: 'babel' },
    );

    await copyPolyfills(polyfills);
    await fs.writeFileSync(`${config.components}/templates/scripts.tsx`, formatted);
}

module.exports = generatePolyfills;
