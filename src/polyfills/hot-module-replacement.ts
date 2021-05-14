import { Component, ELEMENT_REGISTRY } from '@atomify/hooks';

function installWebComponentHmr() {
    type Class = { new (...args: any[]): any };
    const implMap = new Map();

    const originalDefine = customElements.define;

    function hotDefine(tagname: string, classObj: Class) {
        if (!('hotReplaceCallback' in classObj)) {
            return originalDefine.call(customElements, tagname, classObj);
        }
        const impl = implMap.get(tagname);

        if (!impl) {
            implMap.set(tagname, classObj);
            originalDefine.call(customElements, tagname, classObj);
        } else {
            impl.hotReplaceCallback(classObj);
        }
    }

    // Overwrite customElements.define with a custom function
    customElements.define = hotDefine;

    customElements.get = () => false;

    // Add a static callback to HTMLElement to use as a trigger to update the components
    (HTMLElement as any).hotReplaceCallback = function hotReplaceCallback(classObj: Class) {
        const existingProps = new Set(Object.getOwnPropertyNames(this.prototype));
        const newProps = new Set(Object.getOwnPropertyNames(classObj.prototype));
        for (const prop of Object.getOwnPropertyNames(classObj.prototype)) {
            Object.defineProperty(
                this.prototype,
                prop,
                Object.getOwnPropertyDescriptor(classObj.prototype, prop) as PropertyDescriptor,
            );
        }

        for (const existingProp of existingProps) {
            if (!newProps.has(existingProp)) {
                delete this.prototype[existingProp];
            }
        }

        const elements = ELEMENT_REGISTRY.get(this);

        if (!elements) {
            return;
        }

        for (const element of elements) {
            (element as Component).update();
        }
    };
}

// Only install the webcomponent overwrite during hot module reload.
// Also to make sure that this function doesnt end up in the production build.
if (module.hot) {
    installWebComponentHmr();
}
