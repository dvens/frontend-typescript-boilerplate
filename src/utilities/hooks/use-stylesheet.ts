import { unsafeCSS, useStyles } from '@atomify/css';

export function useStylesheet(style: string) {
    useStyles(() => unsafeCSS(style));
}
