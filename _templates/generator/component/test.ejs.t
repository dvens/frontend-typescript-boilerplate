---
to: "<%= withTest ? `src/components/${h.inflection.pluralize(kind)}/${h.inflection.dasherize(name)}/${h.inflection.dasherize(name)}.test.ts` : null %>"
---
describe('Some test', function() {
    it('should be imported', function() {
        console.log('Testing is important');
    });
});
