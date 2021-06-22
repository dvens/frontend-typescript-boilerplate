import { h, renderToString } from '@atomify/jsx';
import { Head } from '@atomify/kit';
import { routeConfig } from '@pages/routes';
import { store } from '@source/store';
import getDefaultMode from '@tools/utilities/get-default-mode';
import { getScripts } from '@tools/utilities/scripts';
import { NextFunction, Request, Response } from 'express';

import App from '@/pages/_app';
import Document from '@/pages/_document';

import { PUBLIC_PATH } from '../constants';

const IS_DEVELOPMENT = getDefaultMode() === 'development';

export default async function ssr(req: Request, res: Response, next: NextFunction) {
    const htmlContent = renderToString(<App location={req.url} routeConfig={routeConfig} />);
    const head = Head.renderAsElements();

    const { scripts, code } = await getScripts({
        isDebug: IS_DEVELOPMENT,
        manifestPath: `${PUBLIC_PATH}/polyfills-manifest.json`,
    });

    const initialState = store.getState();
    const html = renderToString(
        <Document
            htmlContent={htmlContent}
            head={head}
            initialState={initialState}
            css={[res.locals.assetPath('main.css')]}
            scripts={scripts}
            polyfillScript={code}
        />,
    );

    try {
        res.status(200).send(`<!doctype html>${html}`);
    } catch (error) {
        next(error);
    }
}
