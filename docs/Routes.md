[⟵ Back to overview](../README.md)

# Table of Contents
- [Express](#express)
- [Routing](#routing)
- [Static rendering](#static-rendering)

## Express ##
This setup is built using [Express.js](https://expressjs.com/) web framework. Express is mainly used in this setup for development purposes to remove the compiling step of `.njk` files when a template is changed. The `Express` app can also be build for production with the following command:

```bash
yarn build:server
```

## Routing ##
Routing within this setup is based upon folder structure the routes are defined within the `src/pages/` folder. You can create a page by adding a new folder for example: `/products/overview.njk` the Express server will render this as `http://localhost:3000/products/overview`.

You can easily create dynamic pages by creating a page with brackets. For example: `/products/[id].njk` -> `http://localhost:3000/product/100` this will serve a page with `{ id: '100' }`.

You can provide the page with data based upon the `id` by adding a Javascript file that will be executed by `Express`. For example:

1. Create a file named `[id].js` within the same folder as the `[id].njk`.
2. This file contains the data that can be reused within the template (can be an API call or as shown in the example below a call to a JSON file):

```javascript
const products = require('./products.json');

module.exports = (req, res) => {
    const { id } = req.params;
    return {
        product: products.find(p => p.id === id),
    };
};
```

## Static rendering ##
The setup also has the ability to render the pages statically by running `yarn static` this will only statically render the pages that do not have a slug.

You can add the the dynamic pages to the `config/dynamic-route-exports.js` to include them as a static page. Example:

```javascript
async function dynamicRouteExports() {
    const file = fs.readFileSync(path.join(__dirname, '../src/pages/products/products.json'));
    const products = JSON.parse(file);

    return products.map(product => `/products/${product.slug}`);
}
```