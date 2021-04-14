import { h } from '@atomify/jsx';

interface DocProps {
    htmlContent?: JSX.Element;
    head?: Record<string, any>;
    initialState?: Record<string, unknown>;
}

const Document = ({ head, htmlContent, initialState }: DocProps) => {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="disabled-adaptations" content="watch" />
                <base href="/" />

                {/*TODO: Implement favicons */}
                {head && head}
            </head>
            <body>
                <div id="app">{htmlContent && htmlContent}</div>

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
