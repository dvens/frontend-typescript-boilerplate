---
to: "<%= componentType === 'n' && withStorybook ? `src/components/${h.inflection.pluralize(kind)}/${h.inflection.dasherize(name)}/${h.inflection.dasherize(name)}.stories.njk` : null %>"
---

{% from './<%= h.inflection.dasherize(name, true) %>.macro.njk' import <%= h.inflection.camelize(name, true) %> %}
{{ <%= h.inflection.camelize(name, true) %>(data) }}
