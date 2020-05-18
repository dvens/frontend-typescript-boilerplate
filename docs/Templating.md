[⟵ Back to overview](../README.md)

# Table of Contents
- [Nunjucks](#commands)
- [Using Macros](#using-macros)
- [JSON](#json-data)
- [Options](#options)

# Nunjucks #
[What is nunjucks?](https://mozilla.github.io/nunjucks/) Nunjucks is a powerful templating engine, using Javascript. It allows you to create sophisticated [macros](https://mozilla.github.io/nunjucks/templating.html#macro) to render clean and easy-to-read html.

[Go to the Documentation](https://mozilla.github.io/nunjucks/templating.html)

## Using Macros ##

__Macro definition__
This is an example of creating a macro that supports different kind of data.
```htmlmixed
{% macro squareButton(data) %}

    <button class="c-square-button
        {%- if data.variant %} square-button--{{ data.variant }}{% endif -%}
        {%- if data.classes %} {{ data.classes }}{% endif -%}"
        {% if data.hook %} {{ data.hook }}{% endif %}
        {% if data.attributes %} {{ data.attributes | safe }} {% endif %}
        aria-label="{{ data.label }}"
    >
        {{ data.label }}
    </button>

{% endmacro %}
```

__Usage__
Import the macro before using it within a `.njk` file. This is a
```htmlmixed
{% from 'atoms/square-button/square-button.macro.njk' import squareButton %}

{{ squareButton({
    label: 'Modal button',
    svg: 'icons-close',
    variant: 'light',
    classes: 'modal__button modal__button--top',
    hook: 'js-hook-modal-button',
    attributes: ' style="padding: 10px;"'
}) }}
```

## JSON Data ##
The setup uses JSON files to provide the pages with data. The JSON is being imported within a Javascript file and passed through to the `Express` server. Full explanation of routing and pages can be found here [Routing](./Routes.md).

## Options ##
There are serveral global data options available within the templates that you can use:
1. `project.debug` returns a boolean based upon if you run the project in development or production mode.
2. `project.assetPrefix` renders an asset prefix path that can be set during the build through an env. variable: [Env variable options](./Commands.md#options)