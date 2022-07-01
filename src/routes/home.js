const express = require('express');
const { chequeoAutentificacion } = require('../funciones/funcAute')
const homeRouter = express.Router();
const {
  createProduct,
  webCarga,
  webChequeo,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controller/prodController');

//routas home



homeRouter.post('/carga/', createProduct);
homeRouter.get('/carga/', webCarga);
homeRouter.post('/cargaId/', webChequeo);


homeRouter.get('/', chequeoAutentificacion, getProducts);//ok
/*
homeRouter.get('/:id', chequeoAutentificacion, getProductById);
homeRouter.put('/:id', chequeoAutentificacion, updateProductById);

homeRouter.delete('/:id', chequeoAutentificacion, deleteProductById);
*/
module.exports = homeRouter;