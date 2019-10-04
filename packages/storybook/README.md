# Storybook

Storybook utils for displaying web components.

## Setup

-   Add the following scripts to your package.json

```json
"scripts": {
  "storybook": "start-storybook -p 9001",
  "storybook:build": "build-storybook -o _site -s storybook-static",
  "site:build": "npm run storybook:build",
},
```

-   Create an .storybook folder in the root of the project.
-   Create an addons.js and paste in the following base setup (you can add multiple addons if you want):

```javascript
import "@storybook/addon-a11y/register";
import "@storybook/addon-actions/register";
import "@storybook/addon-knobs/register";
import "@storybook/addon-notes/register";
```

-   Create a config.js and add the following base setup:

```javascript
import { configure, addDecorator } from "@storybook/html";
import { withA11y } from "@storybook/addon-a11y";

const req = require.context("../src", true, /.stories.tsx$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

addDecorator(withA11y);
configure(loadStories, module);
```

-   Create a webpack.config.js and add the `default-storybook-webpack-config.js`:

```javascript
const defaultConfig = require("../config/default-storybook-webpack-config");

module.exports = ({ config }) => {
    return defaultConfig({
        config
    });
};
```

## Create a story

Create an `example.stories.tsx|ts` within the assigned folder that you described in the `config.js`:

```typescript
import { storiesOf } from "@storybook/html";
import { withKnobs } from "@storybook/addon-knobs";
import { withClassPropertiesKnobs } from "@frontend/storybook";

import CounterElement from "./counter-element";

const stories = storiesOf("Counter component", module);

stories.addDecorator(withKnobs);

//@ts-ignore
stories.add("with a button", () => withClassPropertiesKnobs(CounterElement), {
    notes: "Hello docss"
});
```
