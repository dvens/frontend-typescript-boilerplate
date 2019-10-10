// @ts-ignore
describe("Render", () => {
    let element: any, shadowRoot: ShadowRoot;

    beforeEach(() => {
        element = document.createElement("web-counter-element") as any;
        shadowRoot = element.shadowRoot as ShadowRoot;
        document.body.appendChild(element);
    });

    it("renders", () => {
        const childElement = shadowRoot.querySelector(
            ".web-counter-element"
        ) as HTMLElement;
        const shadowRootInnerHtml: string = childElement.innerHTML;

        expect(shadowRootInnerHtml).toEqual("Gello");
    });

    afterEach(() => {
        document.body.removeChild(element); // Comment this line to see the element in the dom after the test runs
    });
});
