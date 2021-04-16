import { h, renderToString } from '@atomify/jsx';
import { NextFunction, Request, Response } from 'express';

import App from '@/pages/_app';
import Document from '@/pages/_document';

export default async function ssr(_: Request, res: Response) {
    res.status(200).send(`
        <!DOCTYPE html>
        ${renderToString(<Document htmlContent={<App />} />)}
    `);
}
