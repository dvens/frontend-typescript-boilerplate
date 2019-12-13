import SVGExtension from './extensions/svg';
import { NunjucksOptions } from './nunjucks';

export const nunjucksConfig: NunjucksOptions = {
    extensions: [
        {
            name: 'SVGExtension',
            func: (nunjucks: any) => new SVGExtension(nunjucks),
        },
    ],
};
