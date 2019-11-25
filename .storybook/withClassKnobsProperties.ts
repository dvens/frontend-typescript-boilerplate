import {
    text,
    number,
    date,
    object,
    array,
    boolean
} from '@storybook/addon-knobs';

/**
 * @example
 * class MyEl extends HTMLElement { ... }
 *
 * .add('Playground', () => {
 *   return withClassPropertiesKnobs(MyEl);
 * });
 *
 * @param {any} Klass The class (not instance) you want the knobs for
 * @param {OptionsWithClassPropertiesKnobs} Options Define overrides and a template if needed
 */
export function withClassPropertiesKnobs(Klass: any, {
    overrides: overrideFunction
}: any = {}) {
    let el = new Klass();

    const elProperties = Klass.properties ? Object.keys(Klass.properties) : [];

    const properties = Array.from(elProperties);
    const overrides = overrideFunction ? overrideFunction(el) : [];

    if (Klass.__classProperties) {
        Array.from(Klass.__classProperties.keys()).forEach((propName: string) => {
            if (!elProperties.includes(propName)) {
                properties.push(propName);
            }
        });
    }

    properties.forEach(propName => {

        const override = overrides.find((item: any) => item.key === propName);

        if (override && override.fn) {
            el[propName] = override.fn();
        } else {

            const isElProperty = elProperties.includes(propName);

            let group = isElProperty ? 'Element' : 'Inherited';

            if (override && override.group) {
                group = override.group; // eslint-disable-line prefer-destructuring
            }

            const prop = isElProperty ? Klass.properties[propName] : Klass.__classProperties.get(propName);
            if (prop.type) {
                switch (prop.type) {
                    case 'String':
                        el[propName] = text(propName, el[propName], group);
                        break;
                    case 'Number':
                        el[propName] = number(propName, el[propName], {}, group);
                        break;
                    case 'Array':
                        el[propName] = array(propName, el[propName], ',', group);
                        break;
                    case 'Boolean':
                        el[propName] = boolean(propName, el[propName], group);
                        break;
                    case 'Object':
                        el[propName] = object(propName, el[propName], group);
                        break;
                    case 'Date':
                        el[propName] = new Date(date(propName, el[propName], group));
                        break;
                    default:
                }
            }
        }
    });
    return el;
}
