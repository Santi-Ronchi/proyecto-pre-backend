const express = require('express');
const routerCarro = express.Router();
const { chequeoAutentificacion } = require('../funciones/funcAute')

const {
    getThisCart,
    deleteProductFromCart,
    addProductToCart,
  } = require('../controller/cartController');

routerCarro.get('/', chequeoAutentificacion ,getThisCart);

routerCarro.delete('/:prodId', deleteProductFromCart);

routerCarro.post('/:prodId', addProductToCart);

module.exports = routerCarro;