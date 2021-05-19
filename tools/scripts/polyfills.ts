import fs from 'fs';
import prettier from 'prettier';
import { projectDirectory } from '../config/config';
import { getPolyfills } from '../utilities/polyfills/get-polyfills';
import defaultConfig from '../config/config';
import {
    createProdLoaderScript,
    createDevLoaderScript,
    copyPolyfills,
} from '../utilities/polyfills';
import getDefaultMode from '../utilities/get-default-mode';

let config = null;

try {
    config = require(`${projectDirectory}/config/polyfills.config.js`)(defaultConfig);
} catch (e) {
    /** noop */
}

const IS_PRODUCTION = getDefaultMode() === 'production';

async function generatePolyfills() {
    let formatted = '';

    if (IS_PRODUCTION) {
        const polyfills = await getPolyfills(config);
        const { polyfillScript, code } = await createProdLoaderScript(config, polyfills);

        await copyPolyfills(config, polyfills);

        formatted = prettier.format(
            generateTemplate(`${polyfillScript}\n<script dangerouslySetInnerHTML='${code}' />`),
        );
    } else {
        const { code } = await createDevLoaderScript(config);
        formatted = generateTemplate(code);
    }

    await fs.writeFileSync(config.templateOutputPath, formatted);
}

function generateTemplate(script) {
    return `
    import { Fragment, h } from '@atomify/jsx';

    export const renderScripts = () => {
        return (<Fragment>${script}</Fragment>);
    };
`;
}

export default generatePolyfills;
