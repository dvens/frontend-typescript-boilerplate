---
to: "<%= cssType === 'c' ? `src/components/${h.inflection.pluralize(kind)}/${h.inflection.dasherize(name)}/${h.inflection.dasherize(name)}.css` : `src/components/${h.inflection.pluralize(kind)}/${h.inflection.dasherize(name)}/${h.inflection.dasherize(name)}.scss` %>"
---

<% if(componentType === 'n'){ -%>
.c-<%= h.inflection.dasherize( name ) %>{}
<% } -%>
<% if(componentType === 'a'){ -%>
<%= h.inflection.dasherize(name) %>{}
<% } -%>
