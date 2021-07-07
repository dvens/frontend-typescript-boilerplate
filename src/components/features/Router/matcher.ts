interface MatcherOptions {
    url: string;
    regex?: MatcherRegex;
}
export interface Params {
    [id: string]: string;
}

export type MatcherRegex = { [param: string]: RegExp };
export type Matcher = {
    params: Params;
    url: string;
} | null;

const OPTIONAL_PARAM = /\((.*?)\)/g;
const NAMED_PARAM = /(\(\?)?:\w+/g;
const SPLAT_PARAM = /\*\w+/g;
const ESCAPE_STRING_REGEX = /[\-{}\[\]+?.,\\\^$|#\s]/g;

export const matcher = (path = '', options: MatcherOptions): Matcher => {
    const { url, regex = null } = options;

    const result: Params = {};

    const [routeRegex, paramNames] = routeToRegExp(path);

    const match = routeRegex.exec(url);
    const params = match && match.slice(1);

    if (!params) return null;

    params.forEach((param, index) => {
        const paramValue =
            index === params.length - 1 ? param || '' : param ? decodeURIComponent(param) : '';
        const paramName = paramNames[index];

        // Check if there is a custom regex (ex: check if the param is a number)
        if (regex && paramName in regex && !validateRegex(regex[paramName], paramValue))
            return null;

        return (result[paramName] = paramValue);
    });

    return {
        params: result,
        url,
    };
};

function routeToRegExp(route: string): [RegExp, string[]] {
    const names: string[] = [];
    route = route
        .replace(ESCAPE_STRING_REGEX, '\\$&')
        .replace(OPTIONAL_PARAM, '(?:$1)?')
        .replace(NAMED_PARAM, (match, optional) => {
            names.push(match.substr(1));
            return optional ? match : '([^/]+)';
        })
        .replace(SPLAT_PARAM, '(.*?)');

    return [new RegExp(`^${route}$`), names];
}

function validateRegex(rule: RegExp, value: string) {
    return rule.test(value);
}
