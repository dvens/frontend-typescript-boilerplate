const favicons = require('favicons');
const fs = require('fs');

const { favicon } = require('../utilities/get-config');

async function generateFavicons() {
    await favicons(favicon.source, favicon.faviconsPlugin, async (error, response) => {
        if (error) throw new Error(error.message);

        const metaTags = response.html.join('\n');

        response.images.forEach(image => {
            fs.writeFileSync(`${favicon.folder}/${image.name}`, image.contents);
        });

        response.files.forEach(file => {
            fs.writeFileSync(`${favicon.folder}/${file.name}`, file.contents);
        });

        await fs.writeFileSync(favicon.output, metaTags);
    });
}

module.exports = generateFavicons;
