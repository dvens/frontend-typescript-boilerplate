import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/html';

const stories = storiesOf('Button Component', module);
stories.addDecorator(withKnobs);

import buttonTemplate from './button.stories.html';
console.log(buttonTemplate);

stories.add('with a button', () => `${buttonTemplate}`);
