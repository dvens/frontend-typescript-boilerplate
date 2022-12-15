import { h, renderToString } from '@atomify/jsx';
import { Head } from '@atomify/kit';
import { NextFunction, Request, Response } from 'express';

import App from '@/pages/_app';
import Document from '@/pages/_document';

import { routeConfig } from '@pages/routes';
import { store } from '@source/store';

export default async function ssr(req: Request, res: Response, next: NextFunction) {
    const htmlContent = renderToString(<App location={req.url} routeConfig={routeConfig} />);
    const head = Head.renderAsElements();

    const initialState = store.getState();
    const html = renderToString(
        <Document
            htmlContent={htmlContent}
            head={head}
            initialState={initialState}
            css={[res.locals.assetPath('main.css')]}
            scripts={[res.locals.assetPath('main.js')]}
        />,
    );

    try {
        res.status(200).send(`<!doctype html>${html}`);
    } catch (error) {
        next(error);
    }
}
