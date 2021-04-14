import { h, renderToString } from '@atomify/jsx';
import express from 'express';
export interface RoutesConfig {
    rootFolder: string;
    app: any;
    port: number;
    routeExtension: string;
}

export const webRoutes = (config: RoutesConfig) => {
    config.app.get('*', async (_: express.Request, res: express.Response) => {
        const App = require('../../pages/_app');
        // add as refresh page cache only in dev mode
        Object.keys(require.cache).forEach(function (module) {
            delete require.cache[module];
        });
        res.send(renderToString(<App.default />));
    });
};
