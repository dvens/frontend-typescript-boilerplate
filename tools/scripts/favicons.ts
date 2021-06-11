import favicons from 'favicons';
import fs from 'fs';
import prettier from 'prettier';
import { projectDirectory } from '../config/config';
import projectConfig from '../config/config';

let config = {
    source: '',
    faviconsPlugin: {},
    folder: '',
    outputFile: '',
};

try {
    config = require(`${projectDirectory}/config/favicons.config.js`)(projectConfig);
} catch (e) {
    /** noop */
}

async function generateFavicons() {
    if (!config.source) return;

    await favicons(config.source, config.faviconsPlugin, async (error, response) => {
        if (error) throw new Error(error.message);

        response.images.forEach((image) => {
            fs.writeFileSync(`${config.folder}/${image.name}`, image.contents);
        });

        response.files.forEach((file) => {
            fs.writeFileSync(`${config.folder}/${file.name}`, file.contents);
        });

        const metaTags = response.html
            .map((html) => {
                return html.replace('">', '" />');
            })
            .join('\n');

        prettier.resolveConfigFile().then((filePath) => {
            prettier.resolveConfig(filePath).then((options) => {
                const formatted = prettier.format(
                    `
                    import { Fragment, h } from '@atomify/jsx';
                    export const renderFavicons = () => {
                        return (
                        <Fragment>
                            ${metaTags}
                        </Fragment>
                        )
                    }
                    `,
                    options,
                );

                fs.writeFileSync(config.outputFile, formatted);
            });
        });
    });
}

export default generateFavicons;
