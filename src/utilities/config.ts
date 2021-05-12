import { ConfigObject } from '@atomify/kit';

export const config: ConfigObject = {
    title: 'Starter',
    base: {
        href: '/',
    },
    meta: [
        {
            name: 'description',
            content: 'A frontend starter',
        },
    ],
    link: [
        {
            href: 'http://localhost:3001/static/css/main.css',
            as: 'style',
            rel: 'preload',
        },
    ],
};
