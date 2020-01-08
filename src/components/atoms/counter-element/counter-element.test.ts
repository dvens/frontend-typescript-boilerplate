import { CounterElement } from './counter-element';

describe('Changing button type', function() {
    let elem: CounterElement;

    beforeEach(async function() {
        elem = new CounterElement();
        document.body.appendChild(elem);
    });

    it('should choose the right template', async function() {
        await (elem as any).componentOnReady();
        expect(elem!.shadowRoot!.querySelectorAll('button').length).toBe(1);
    });

    it('it should update the count of the element', async function() {
        elem.increaseCount();
        expect(elem.count).toEqual(1);
    });

    afterAll(function() {
        document.body.removeChild(elem);
    });
});
