# ESLint

Use [ESLint](https://eslint.org/) to lint your es6 code.

## Install

-   install @frontend/eslint

```bash
  npm install -D @frontend/eslint
```

-   Add the following script to your package.json

```js
"scripts": {
  "lint-fix": "eslint src/ --ext .ts,.tsx --fix"
},
```

-   Update your `.eslintrc.js` to look like this:

```js
module.exports = {
    extends: ["@frontend/eslint"].map(require.resolve)
};
```
