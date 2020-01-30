import express from 'express';
import * as fs from 'fs';
import path from 'path';

import { config as projectConfig } from '../../tools/utilities/get-config';
export interface RoutesConfig {
    routeExtension: string;
    rootFolder: string;
    app: any;
    port: number;
}

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
            templateUrl: '',
            data: projectConfig.nunjucks,
        };
    }

    // Check if the page has a corresponding JSON file.
    if (hasJSONfile) {
        const JSONfile = fs.readFileSync(JSONUrl);
        data = JSON.parse(`${JSONfile}`);
    }

    return {
        templateUrl,
        data: Object.assign({}, projectConfig.nunjucks, data),
    };
}

export const webRoutes = (config: RoutesConfig) => {
    config.app.get('*', (req: express.Request, res: express.Response) => {
        const { templateUrl, data } = getTemplate(req.originalUrl, config);

        if (templateUrl) {
            res.render(templateUrl, data);
        } else {
            res.status(404).render(`404${config.routeExtension}`, data);
        }
    });
};
