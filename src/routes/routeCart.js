const express = require('express');
const cartRouter = express.Router();
const { chequeoAutentificacion } = require('../funciones/funcAute')
const {
    mostrarCarro
  } = require('../controller/cartController');

cartRouter.get('/', chequeoAutentificacion, mostrarCarro)

module.exports = cartRouter;