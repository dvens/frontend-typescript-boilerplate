import { Component, Prop, Query, Watch } from '@atomify/core';
import { Fragment, h } from '@atomify/jsx';

import style from './counter-element.scss';

@Component({
    tag: 'counter-element',
    style,
    shadow: true,
})
export default class CounterElement extends HTMLElement {
    @Prop({ reflectToAttribute: true, type: 'Number' }) count: number = 0;
    @Prop() title: string = 'Click to update';

    @Query('[js-hook-count]') countWrapper: HTMLSpanElement;

    @Watch('count')
    updateCount(newValue: number) {
        this.countWrapper.textContent = ` ${newValue}`;
    }

    increaseCount = () => {
        this.count = this.count + 1;
    };

    render() {
        return (
            <Fragment>
                <button onClick={this.increaseCount}>{this.title}:</button>
                <span js-hook-count> {this.count}</span>
            </Fragment>
        );
    }
}
