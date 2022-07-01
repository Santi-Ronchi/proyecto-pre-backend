const Products = require('../container/productCont');
const Product = new Products();
const {faker} = require('@faker-js/faker');

module.exports = {
  createProduct: async (req, res) => {
    try {
      const prod = {producto:{
        id: Math.floor(Math.random() * 1000000000), ///hacer que no se repita
        nombre: req.body.nombre,
        precio: req.body.precio,
        foto: req.body.foto,
        descripcion: req.body.descripcion
      }}
      const id = await Product.save(prod);
      res.redirect('/api/home/carga')
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },

  webCarga: (req,res)=>{
    res.render('cargaProductos')
  },

  webChequeo: async (req,res)=>{
    const dato = await  Product.getById(req.body._id)
    res.redirect('/api/home/carga')
  },

  getProducts: async (req, res) => { 
    try {
      const datos = await Product.getAll()
      const nombre = req.user.nombre;
      console.log(datos);
      res.render('home',{ nombre, datos })
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },

  getProductById: async (req, res) => {
    const idProduct = req.params.id;
    try {
      const data = await Product.getById(idProduct);
      console.log(data)
      res.status(200).send({
        status: 200,
        data,
        message: 'product was obtained successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  }
};