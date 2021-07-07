import { onDidLoad, useReactive, useRef } from '@atomify/hooks';

// Implementation of https://github.com/molefrog/wouter/blob/master/use-location.js
const eventPopstate = 'popstate';
const eventPushState = 'pushState';
const eventReplaceState = 'replaceState';
export const events = [eventPopstate, eventPushState, eventReplaceState];

export const useHistory = ({ base = '' } = {}) => {
    const historyState = useReactive<{ path: string; search: string }>({
        path: currentPathname(base),
        search: location.search,
    });

    const prevHash = useRef(`${historyState.path}${historyState.search}`);

    onDidLoad(() => {
        const checkForUpdates = () => {
            const pathname = currentPathname(base);
            const search = location.search;
            const hash = `${pathname}${search}`;

            if (prevHash.current !== hash) {
                prevHash.current = hash;
                historyState.path = pathname;
                historyState.search = search;
            }
        };

        events.forEach((e) => addEventListener(e, checkForUpdates));

        checkForUpdates();
    });

    function navigate(to: string, { replace = false } = {}) {
        history[replace ? eventReplaceState : eventPushState](
            null,
            '',
            // handle nested routers and absolute paths
            to[0] === '~' ? to.slice(1) : base + to,
        );
    }

    return { historyState, navigate };
};

// TODO: Fix lingint errors
// See https://stackoverflow.com/a/4585031
if (typeof window.history !== 'undefined') {
    for (const type of [eventPushState, eventReplaceState]) {
        // @ts-ignore
        const original = history[type];

        // @ts-ignore
        history[type] = function (...args: any) {
            const result = original.apply(this, args);
            const event = new Event(type);

            // @ts-ignore
            event.arguments = args;

            dispatchEvent(event);
            return result;
        };
    }
}

const currentPathname = (base: string, path = location.pathname) =>
    !path.toLowerCase().indexOf(base.toLowerCase()) ? path.slice(base.length) || '/' : '~' + path;
