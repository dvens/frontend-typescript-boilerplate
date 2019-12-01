import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/html';
import { text } from '@storybook/addon-knobs';

import { h } from '@atomify/jsx';

import './counter-element';
import counterElementDocs from './counter-element.md';

const stories = storiesOf('Counter component', module);
stories.addDecorator(withKnobs);

stories.add(
    'with a button',
    () => <counter-element title={text('title', 'Subtitle')}></counter-element>,
    {
        notes: counterElementDocs,
    },
);
