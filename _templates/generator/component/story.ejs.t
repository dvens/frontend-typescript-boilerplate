---
to: "<%= withStorybook ? `src/components/${h.inflection.pluralize(kind)}/${h.inflection.dasherize(name)}/${h.inflection.dasherize(name)}.stories.tsx` : null %>"
---
<% if(componentType === 'a'){ -%>
import './<%= h.inflection.dasherize(name) %>.tsx';
<% } -%>

import { storiesOf } from '@storybook/html';

<% if(componentType === 'n'){ -%>
import template from './<%= h.inflection.dasherize(name) %>.stories.njk';
<% } -%>

storiesOf('<%= h.inflection.dasherize(name) %>', module).add('default', () => {
<% if(componentType === 'n'){ -%>
    const renderedTemplate = template.render();
    return renderedTemplate;
<% } -%>
<% if(componentType === 'a'){ -%>
    return `<<%= h.inflection.dasherize(name) %>></<%= h.inflection.dasherize(name) %>>`;
<% } -%>
})
