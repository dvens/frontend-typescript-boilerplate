import { Component } from "@atomify/core";
import { h } from "@atomify/jsx";

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
        return <div>hello world!</div>;
    }
}
