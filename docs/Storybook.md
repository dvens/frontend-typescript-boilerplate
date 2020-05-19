[⟵ Back to overview](../README.md)

# Table of Contents
- [Storybook](#storybook)
- [Commands](#commands)
- [Usage](#usage)
    - [Creating a story](#creating-a-story)

## Storybook ##
This setup is using [Storybook](https://storybook.js.org/docs/basics/introduction/) for demoing, documenting and showcasing different states of Web and Nunjucks components.

The configuration of Storybook can be found within the `.storybook` folder.

## Commands ##
- Run Storybook `yarn storybook`
- Run Storybook for production `yarn storybook:build`

## Usage ##

### Creating a story ###
This setup is using [nunjucks-loader](https://www.npmjs.com/package/nunjucks-loader) to render the components within Storybook.

__Creating a Story for Nunjuck components__
1. Create a `[macroName].stories.njk`
2. Within this file you can call the macro as following (we execute the macro immediately because its the only way the `nunjucks-loader` is working with Storybook):
```htmlmixed
{% from './button.macro.njk' import button %}
{{ button( data ) }}
```
3. Now you can import the template within the a story (create a `[macroName].stories.tsx`) first:
```javascript
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/html';

import macroTemplate from './[macroName].stories.njk';

const stories = storiesOf('[macroName]', module);

stories.add(
    'with a [macroName]',
    () => `${macroTemplate.render({ data: { label: text('title', 'Subtitle') } })}`,
);
```
The data object is the same data that you normally would use to provide the macro with data. This setup uses [@storybook/addon-knobs](https://github.com/storybookjs/storybook/tree/master/addons/knobs). This makes it possible to change data on the fly within a Nunjucks macro.
5. You can also run `yarn generate [macroName]` this will generate the component with the option to also auto generate the Storybook files.
