import { h, renderToString } from '@atomify/jsx';
import { Head } from '@atomify/kit';
import { store } from '@source/store';
import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';

import App from '@/pages/_app';
import Document from '@/pages/_document';

export default async function ssr(_: Request, res: Response, next: NextFunction) {
    const htmlContent = renderToString(<App />);
    const head = Head.renderAsElements();
    const initialState = store.getState();

    try {
        res.status(200).send(`
            <!doctype html>
            ${renderToString(
                <Document htmlContent={htmlContent} head={head} initialState={initialState} />,
            )}
        `);
    } catch (error) {
        res.status(404).send('Not Found');
        console.error(chalk.red(`==> Rendering error: ${error}`));
    }

    next();
}
