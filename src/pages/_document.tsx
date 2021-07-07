import { h, VNode } from '@atomify/jsx';
import serialize from 'serialize-javascript';

import { renderFavicons } from '@/components/templates/Favicons';

import { AppState } from '@store/index';

interface DocProps {
    htmlContent?: string;
    head?: VNode[];
    initialState?: AppState;
    css: string[];
    scripts?: Array<{ src: string; type: null | string; nomodule: boolean }>;
    polyfillScript?: string | null;
}

const Document = ({ head, htmlContent, initialState, css, scripts, polyfillScript }: DocProps) => {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="disabled-adaptations" content="watch" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {css.filter(Boolean).map((href) => (
                    <link rel="stylesheet" href={href} />
                ))}
                {head && head}
                {renderFavicons()}
            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={htmlContent} />

                {initialState && (
                    <script
                        dangerouslySetInnerHTML={`window.__INITIAL_STATE__=${serialize(
                            initialState,
                        )}`}
                    />
                )}
                {scripts && scripts.map((props) => <script {...props} />)}
                {polyfillScript && <script dangerouslySetInnerHTML={polyfillScript} />}
            </body>
        </html>
    );
};

export default Document;
