import './counter-element';

import { h } from '@atomify/jsx';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/html';

import counterElementDocs from './counter-element.md';

const stories = storiesOf('Counter component', module);

stories.add(
    'with a button',
    () => <counter-element title={text('title', 'Subtitle')}></counter-element>,
    {
        notes: counterElementDocs,
    },
);
