---
to: "<%= componentType === 'a' ? `src/components/${h.inflection.pluralize(kind)}/${h.inflection.dasherize(name)}/${h.inflection.dasherize(name)}.tsx` : `src/components/${h.inflection.pluralize(kind)}/${h.inflection.dasherize(name)}/${h.inflection.dasherize(name)}.macro.njk` %>"
---

<% if(componentType === 'a'){ -%>
import { Component } from '@atomify/core';
import { h } from '@atomify/jsx';

<% if(cssType === 'c'){ %>
import style from './<%= h.inflection.dasherize(name) %>.css';
<% } -%>

<% if(cssType === 's'){ %>
import style from './<%= h.inflection.dasherize(name) %>.scss';
<% } -%>

@Component({
    tag: '<%= h.inflection.dasherize(name) %>',
    style
})
export class <%= h.inflection.classify(Name) %> extends HTMLElement {
  render() {
    return <div></div>
  }
}
<% } -%>
<% if(componentType === 'n'){ -%>
{% macro <%= h.inflection.camelize(name, true) %>(data) %}
    <div class="c-<%= h.inflection.dasherize( name ) %>"></div>
{% endmacro %}
<% } -%>
