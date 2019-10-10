export class CounterElement extends HTMLElement {
    shadowRoot: ShadowRoot;
    _root: any;
    static get tag() {
        return "web-counter-element";
    }

    constructor() {
        super();
        this._root = this.attachShadow({ mode: "open" });
        this.render();
    }

    render() {
        this._root.innerHTML = `
          <div class="web-counter-element">Gello</div>
        `;
    }
}

customElements.define(CounterElement.tag, CounterElement);
