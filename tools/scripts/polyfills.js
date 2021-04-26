const fs = require('fs');
const prettier = require('prettier');

const getPolyfills = require('../utilities/polyfill-loader/get-polyfills');
const {
    createProdLoaderScript,
    createDevLoaderScript,
} = require('../utilities/polyfill-loader/loader-script');
const copyPolyfills = require('../utilities/polyfill-loader/copy-polyfills');
const { polyfillLoader, config } = require('../utilities/get-config');

const getDefaultMode = require('../utilities/get-default-mode');

const IS_PRODUCTION = getDefaultMode() === 'production';

async function generatePolyfills() {
    let formatted = '';

    if (IS_PRODUCTION) {
        const polyfills = await getPolyfills(polyfillLoader);
        const script = await createProdLoaderScript(polyfillLoader, polyfills);
        formatted = prettier.format(generateAtomifyComponent(script), { parser: 'babel' });

        await copyPolyfills(polyfills);
    } else {
        const script = await createDevLoaderScript(polyfillLoader);
        formatted = generateAtomifyComponent(script);
    }

    await fs.writeFileSync(`${config.components}/templates/scripts.tsx`, formatted);
}

function generateAtomifyComponent(script) {
    return `
    import { Fragment, h } from '@atomify/jsx';

    export const renderScripts = () => {
        return (<Fragment>${script}</Fragment>);
    };
`;
}

module.exports = generatePolyfills;
