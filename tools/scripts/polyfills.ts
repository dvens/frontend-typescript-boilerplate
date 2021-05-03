import fs from 'fs';
import prettier from 'prettier';

import globalConfig from '../utilities/get-config';
import getDefaultMode from '../utilities/get-default-mode';
import copyPolyfills from '../utilities/polyfill-loader/copy-polyfills';
import getPolyfills from '../utilities/polyfill-loader/get-polyfills';
import {
    createDevLoaderScript,
    createProdLoaderScript,
} from '../utilities/polyfill-loader/loader-script';

const { polyfillLoader } = globalConfig;

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

    await fs.writeFileSync(polyfillLoader.templateOutputPath, formatted);
}

function generateAtomifyComponent(script) {
    return `
    import { Fragment, h } from '@atomify/jsx';

    export const renderScripts = () => {
        return (<Fragment>${script}</Fragment>);
    };
`;
}

export default generatePolyfills;
