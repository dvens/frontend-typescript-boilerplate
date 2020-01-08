import { inviewObserver } from '@utilities/inview';

export interface LoadableOptions {
    hook: string;
    loader: () => Promise<any>;
    loading?: Function | string;
    onError?: (error: string) => void;
    onLoaded?: () => void;
    inViewOptions?: IntersectionObserverInit;
}

const INITIALIZERS = new Map<string, Element[]>();
const READY_INITIALIZERS: string[] = [];

export const Loadable = (options: LoadableOptions) => {
    const elements = document.querySelectorAll(options.hook);

    // Check if there are any elements
    if (elements.length !== 0) {
        // Creates a map from the hook and related elements.
        Array.from(elements).forEach(element => {
            if (INITIALIZERS.has(options.hook)) {
                const currentElements = INITIALIZERS.get(options.hook);
                if (currentElements) INITIALIZERS.set(options.hook, [...currentElements, element]);
            } else {
                INITIALIZERS.set(options.hook, [element]);
            }

            // Observe element when added to the map.
            observeComponent(element, options);
        });
    }
};

// Module gets loaded
// Remove empty state
// Check if there are any other elements that are related and remove the empty state.

/**
 * Observes the components when they are not inview and intializes them when they are in view.
 * @param {Element} element
 * @param {LoadableOptions} options
 */
function observeComponent(element: Element, options: LoadableOptions) {
    inviewObserver.observe(
        element,
        inView => {
            // Check if component is already intialized otherwise trigger onloaded immediately.
            if (inView) {
                options
                    .loader()
                    .then(() => {
                        // Keep a reference of already intialized elements
                        READY_INITIALIZERS.push(options.hook);

                        // Unobserve when component is inview
                        inviewObserver.unobserve(element);

                        // Trigger onload callback when the module is successfully loaded
                        if (options.onLoaded) options.onLoaded();
                    })
                    .catch(error => {
                        // Trigger onerror callback when the module is not successfully loaded.
                        if (options.onError) options.onError(error);
                    });
            }
        },
        options.inViewOptions || {},
    );
}

// function applyEmptyState(element: Element) {}

// function removeEmptyState(element: Element) {}
