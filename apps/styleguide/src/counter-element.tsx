import { Component } from "@atomify/core";

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
        return `
            <h1>Hello world!</h1>
        `;
    }
}
