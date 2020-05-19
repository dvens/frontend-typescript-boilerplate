[⟵ Back to overview](../README.md)

# Table of Contents
- [Web Components](#web-components)

## Web Components ##
It is also possible within this setup to use Web Components. This project is running on [@atomify/core](https://www.npmjs.com/package/@atomify/core) and [@atomify/jsx](https://www.npmjs.com/package/@atomify/jsx). This setup is Web Components because of the following reasons:

- Web Components have some callbacks that are usefull when you are creating dynamic Vanilla JS websites without framework. The most import callbacks are ([all Web Component callbacks](https://developers.google.com/web/fundamentals/web-components/customelements#reactions)):

| Lifecycle      | Description |
| ----------- | ----------- |
| constructor      | This is being called when a new instance is created ( useful for setting state or settings )       |
| connectedCallback   | This is being called everytime the element is inserted into the DOM        |
| disconnectedCallback      | This is being called everytime the element is removed from the DOM       |
| adoptedCallback      | This is being called when the custom element is moved into a new DOM       |
