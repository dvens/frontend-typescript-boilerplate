const products = require('./products.json');

module.exports = (req, res) => {
    return {
        products,
    };
};
