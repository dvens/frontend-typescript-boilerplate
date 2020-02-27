import express from 'express';

import products from './products.json';

const init: express.RequestHandler = (req, _res) => {
    const { slug } = req.params;

    return {
        product: products.find(p => p.slug === slug),
    };
};

export default init;
