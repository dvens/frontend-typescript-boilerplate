export const waitForComponentToRender = (tag: string) => {
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
