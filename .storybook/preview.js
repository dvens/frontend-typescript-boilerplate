import '@/styles/globalStyles.scss';

import { setupDefaultRender } from '@atomify/hooks';
import { JSXRenderer } from '@atomify/jsx';

setupDefaultRender(JSXRenderer);

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
