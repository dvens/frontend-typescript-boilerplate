---
to: "<%= withDocs ? `src/components/${h.inflection.pluralize(kind)}/${h.inflection.dasherize(name)}/${h.inflection.dasherize(name)}.md` : null %>"
---

# <%= h.inflection.dasherize(name) %>

## Accepted props
Props        | Description  | Properties
------------ | -------------| -----------

## What does it do
Component description

## Install
<% if(componentType === 'n'){ -%>
```htmlmixed
{% from '<%= h.inflection.pluralize(kind) %>/<%= h.inflection.dasherize(name, true) %>.macro.njk' import <%= h.inflection.camelize(name, true) %> %}
```
<% } -%>

<% if(componentType === 'a'){ -%>
```javascript
import '@<%= h.inflection.pluralize(kind) %>/<%= h.inflection.dasherize(name, true) %>';
```
<% } -%>

## How to use
<% if(componentType === 'n'){ -%>
```htmlmixed
{{ <%= h.inflection.camelize(name, true) %>() }}
```
<% } -%>

<% if(componentType === 'a'){ -%>
```javascript
<<%= h.inflection.dasherize(name) %>></<%= h.inflection.dasherize(name) %>>
```
<% } -%>

## Dependencies
Dependencies description
