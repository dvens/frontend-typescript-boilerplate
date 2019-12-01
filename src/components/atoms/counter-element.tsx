import { Component, Prop } from '@atomify/core';
import { h } from '@atomify/jsx';

import style from './counter-element.scss';

@Component({
    tag: 'counter-element',
    style,
    shadow: true,
})
export default class CounterElement extends HTMLElement {
    @Prop() title: string = 'aaaa';

    sayHello() {
        return 'Gello';
    }

    render() {
        return <div>{this.title}</div>;
    }
}
