const glob = require('glob');
const path = require('path');

function getRouteObject(pathName) {
    const files = glob
        .sync(pathName + `/**/*.{njk,tsx,html,ts,js}`)
        .map(file => file.replace(pathName, ''))
        .filter(route => !route.includes('_'))
        .reverse(); // because dynamic routes should be last

    const fileTypes = files.reduce(
        (acc, file) => {
            const extension = file.split('.').pop();
            if (['ts', 'js'].includes(extension)) {
                acc.initiators.push(file);
            } else {
                acc.templates.push(file);
            }

            return acc;
        },
        {
            initiators: [],
            templates: [],
        },
    );

    return fileTypes.templates.map(templatePath => {
        const extension = templatePath.split('.').pop();
        const route = templatePath.replace(`.${extension}`, '');
        const initiatorPath = fileTypes.initiators.find(init => init === `${route}.js`);

        const url = route.replace(/\[/g, ':').replace(/\]/g, '');

        return {
            type: extension,
            isIndex: url.endsWith('index'),
            isDynamic: route.includes('['),
            templatePath: path.join(pathName, templatePath),
            url: url.replace('index', ''),
            initiator: initiatorPath && require(path.join(pathName, initiatorPath)),
        };
    });
}

module.exports = getRouteObject;
