import { h, renderToString } from '@atomify/jsx';
import { Head } from '@atomify/kit';
import ErrorPage from '@pages/_error';
import { Response } from 'express';

import Document from '@/pages/_document';

const errorHandler = (err: Error, _req: any, res: Response, _next: any) => {
    const htmlContent = renderToString(<ErrorPage error={err.message} />);
    const head = Head.renderAsElements();

    const html = renderToString(
        <Document htmlContent={htmlContent} head={head} css={[res.locals.assetPath('main.css')]} />,
    );

    res.status(500);
    res.send(`<!doctype html>${html}`);
};

export default errorHandler;
