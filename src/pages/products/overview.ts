import express from 'express';

import products from './products.json';

const init: express.RequestHandler = () => {
    return {
        products,
    };
};

export default init;
