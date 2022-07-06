const express = require('express');
const { chequeoAutentificacion } = require('../funciones/funcAute')
const homeRouter = express.Router();
const {
  createProduct,
  webCarga,
  webChequeo,
  getProducts,
  getProductById,
} = require('../controller/prodController');

homeRouter.post('/carga/', createProduct);
homeRouter.get('/carga/', webCarga);
homeRouter.post('/cargaId/', webChequeo);
homeRouter.get('/', chequeoAutentificacion, getProducts);

module.exports = homeRouter;