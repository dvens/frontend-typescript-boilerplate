import { h, renderToString } from '@atomify/jsx';
import { Head } from '@atomify/kit';
import { Request, Response } from 'express';

import App from '@/pages/_app';
import Document from '@/pages/_document';

export default async function ssr(_: Request, res: Response) {
    const htmlContent = renderToString(<App />);
    const head = Head.renderAsElements();

    res.status(200).send(`
        <!DOCTYPE html>
        ${renderToString(<Document htmlContent={htmlContent} head={head} />)}
    `);
}
