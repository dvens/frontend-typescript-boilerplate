# Prettier

Use [Prettier](https://prettier.io) to format your TS and TSX files.

## Install

-   install @frontend/prettier

```bash
  npm install -D @frontend/prettier
```

-   Create `prettier.config.js` in your project

```js
module.exports = require("@frontend/prettier");
```

-   Install the prettier plugin for your Visual studio code

-   Create `prettier.config.js` in your project

```js
module.exports = require("@frontend/prettier");
```

## Adding .vscode settings
- Create a .vscode folder in the root of your project. Within that folder place a settings.json.
- Place the following code in the settings.json:
```json
{
    "editor.formatOnSave": true,
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ],
    "json.format.enable": true,
}
```

- Last but not least create a .editorconfig in the root of your folder and place the following settings inside of it:
```
# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```