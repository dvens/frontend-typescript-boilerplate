import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/html';

const stories = storiesOf('Button Component', module);
stories.addDecorator(withKnobs);

stories.add('with a button', () => `<button>${text('title', 'Subtitle')}</button>`);
