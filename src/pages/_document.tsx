import { h, VNode } from '@atomify/jsx';

import { renderFavicons } from '@/components/templates/Favicons';
interface DocProps {
    htmlContent?: string;
    head?: VNode[];
    initialState?: string;
}

const Document = ({ head, htmlContent, initialState }: DocProps) => {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="disabled-adaptations" content="watch" />
                {head && head}
                {renderFavicons()}
            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={htmlContent} />

                {/* TODO: Use serialize-javascript for mitigating XSS attacks. */}
                {initialState && (
                    <script dangerouslySetInnerHTML={`window.__INITIAL_STATE__=${initialState}`} />
                )}

                {/*TODO: Replace this with polyfill loader */}
                <script src="/assets/js/main.js" />
            </body>
        </html>
    );
};

export default Document;
