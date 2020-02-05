import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/html';

import buttonTemplate from './button.stories.njk';

const stories = storiesOf('Button Component', module);

stories.add(
    'with a button',
    () => `${buttonTemplate.render({ data: { label: text('title', 'Subtitle') } })}`,
);
