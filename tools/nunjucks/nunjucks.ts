import nunjucks from 'nunjucks';

interface NunjucksOptions {
    extensions?: Array<{ name: string; func: Function }>;
    filters?: Array<{ name: string; func: () => void }>;
    express?: Express.Application;
}

export const nunjucksEnvironment = (
    views: Array<string>,
    options: NunjucksOptions = {},
    app?: Express.Application,
) => {
    const defaultOptions = Object.assign(
        {},
        { autoescape: true, watch: true, noCache: true },
        options,
    );

    if (app) {
        defaultOptions.express = app;
    }

    const env = nunjucks.configure(views, defaultOptions);

    if (defaultOptions.extensions && defaultOptions.extensions.length > 0) {
        defaultOptions.extensions.forEach(extension => {
            env.addExtension(extension.name, extension.func(nunjucks));
        });
    }

    if (defaultOptions.filters && defaultOptions.filters.length > 0) {
        defaultOptions.filters.forEach(filter => {
            env.addFilter(filter.name, filter.func);
        });
    }

    return env;
};
