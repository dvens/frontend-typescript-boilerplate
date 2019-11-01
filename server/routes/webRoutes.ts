import express from 'express';
import * as fs from 'fs';
import path from 'path';

import getDefaultMode from '../../tools/utilities/get-default-mode';
export interface RoutesConfig {
    routeExtension: string;
    rootFolder: string;
    app: any;
    port: number;
}

const defaultData = {
    project: { debug: getDefaultMode() === 'development' },
};

export function getTemplate(url: string, config: RoutesConfig) {
    // Get template url and remove first /
    const templateUrl = path.join(url, `index${config.routeExtension}`).substr(1);
    const JSONUrl = path.join(config.rootFolder, url, 'index.json');
    const hasTemplate = fs.existsSync(path.join(config.rootFolder, templateUrl));
    const hasJSONfile = fs.existsSync(JSONUrl);

    let data = {};

    // Check if the template is there otherwise return null
    if (!hasTemplate) {
        return {
            templateUrl: null,
            data: defaultData,
        };
    }

    // Check if the pages has a corresponding JSON file.
    if (hasJSONfile) {
        const JSONfile = fs.readFileSync(JSONUrl);
        data = JSON.parse(`${JSONfile}`);
    }

    return {
        templateUrl,
        data: Object.assign({}, defaultData, data),
    };
}

export const webRoutes = (config: RoutesConfig) => {
    config.app.get('*', (req: express.Request, res: express.Response) => {
        const { templateUrl, data } = getTemplate(req.originalUrl, config);
        if (templateUrl) {
            res.render(templateUrl, data);
        } else {
            res.status(404).render('404.html', data);
        }
    });
};
