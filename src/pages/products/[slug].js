const products = require('./products.json');

module.exports = (req, res) => {
    const { slug } = req.params;
    return {
        product: products.find(p => p.slug === slug),
    };
};
