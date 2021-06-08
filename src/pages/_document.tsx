import { h, VNode } from '@atomify/jsx';
import { AppState } from '@store/index';
import serialize from 'serialize-javascript';

import { renderFavicons } from '@/components/templates/Favicons';

interface DocProps {
    htmlContent?: string;
    head?: VNode[];
    initialState?: AppState;
    css: string[];
}

const Document = ({ head, htmlContent, initialState, css }: DocProps) => {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="disabled-adaptations" content="watch" />
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
            </body>
        </html>
    );
};

export default Document;
