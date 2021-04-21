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
            href: '/assets/css/main.css',
            as: 'style',
            rel: 'preload',
        },
    ],
};