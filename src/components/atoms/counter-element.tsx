import { Component } from '@atomify/core';
import { h } from '@atomify/jsx';

import style from './counter-element.scss';

@Component({
    tag: 'counter-element',
    style,
    shadow: true,
})
export default class CounterElement extends HTMLElement {
    sayHello() {
        return 'Hello';
    }

    render() {
        return <div>Gello</div>;
    }
}
