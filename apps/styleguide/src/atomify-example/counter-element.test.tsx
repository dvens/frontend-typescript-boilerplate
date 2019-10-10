// @ts-ignore
describe("Render", () => {
    let element: any, shadowRoot: ShadowRoot;

    beforeEach(() => {
        element = document.createElement("counter-element") as any;
        shadowRoot = element.shadowRoot as ShadowRoot;
        document.body.appendChild(element);
    });

    it("renders", async () => {
        await element.componentOnReady();
        const childElement = shadowRoot.querySelector(
            ".counter-element"
        ) as HTMLElement;
        const shadowRootInnerHtml: string = childElement.innerHTML;

        expect(shadowRootInnerHtml).toEqual("Gello");
    });

    afterEach(() => {
        document.body.removeChild(element); // Comment this line to see the element in the dom after the test runs
    });
});
