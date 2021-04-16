const favicons = require('favicons');
const fs = require('fs');
const prettier = require('prettier');

const { favicon } = require('../utilities/get-config');

async function generateFavicons() {
    await favicons(favicon.source, favicon.faviconsPlugin, async (error, response) => {
        if (error) throw new Error(error.message);

        response.images.forEach((image) => {
            fs.writeFileSync(`${favicon.folder}/${image.name}`, image.contents);
        });

        response.files.forEach((file) => {
            fs.writeFileSync(`${favicon.folder}/${file.name}`, file.contents);
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

                fs.writeFileSync(favicon.output, formatted);
            });
        });
    });
}

module.exports = generateFavicons;
