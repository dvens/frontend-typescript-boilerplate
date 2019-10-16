import CounterElement from './counter-element';

const waitForComponentToRender = (tag: string) => {
    return new Promise(resolve => {
        function requestComponent() {
            const element = document.querySelector(tag);
            if (element) {
                resolve(element);
            } else {
                window.requestAnimationFrame(requestComponent);
            }
        }

        requestComponent();
    });
};

describe('Changing button type', function() {
    let elem: any | null;

    beforeEach(async function() {
        elem = new CounterElement();
        document.body.appendChild(elem);
    });

    it('it should say hello', async function() {
        expect(elem.sayHello()).toBe('Hello');
    });

    it('should choose the right template for default type', async function() {
        const elementTest: any = await waitForComponentToRender('counter-element');
        await elementTest.componentOnReady();

        expect(elementTest!.shadowRoot!.querySelectorAll('div').length).toBe(1);
    });

    afterAll(function() {
        document.body.removeChild(elem);
    });
});
