const path = require('path');
const fs = require('fs');

async function dynamicRouteExports() {
    const file = fs.readFileSync(path.join(__dirname, '../src/pages/products/products.json'));
    const products = JSON.parse(file);

    return products.map(product => `/products/${product.slug}`);
}

module.exports = dynamicRouteExports;
