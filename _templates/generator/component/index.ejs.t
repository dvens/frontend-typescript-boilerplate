---
to: "<%= componentType === 'a' ? `src/components/${h.inflection.pluralize(kind)}/${h.inflection.dasherize(name)}/index.ts` : null %>"
---
export * from './<%= h.inflection.dasherize(name) %>';
