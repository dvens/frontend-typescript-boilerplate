import { Component } from "@atomify/core";
import { h, Fragment } from "@atomify/jsx";

@Component({
    tag: "counter-element",
    style: `
        :host {
            display: block;
            background-color: tomato;
        }
    `,
    shadow: true
})
export default class CounterElement extends HTMLElement {
    render() {
        return (
            <Fragment>
                <div>hello world!</div>
            </Fragment>
        );
    }
}
