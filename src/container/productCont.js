const { conexionMongoDB , disconnectMongoDB } = require('../daos/mongodb');
const productSchema = require('../schemas/products');

class Productos {
  
  async save(producto) {
    try {
      await conexionMongoDB()
      const data = await productSchema.create(producto)
      disconnectMongoDB()
        return data
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getById(id) {
    try {
      await conexionMongoDB()
      const data = await productSchema.findById(id)
      disconnectMongoDB()
        return data 
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getAll() {
    try {
      await conexionMongoDB()
      const data = await productSchema.find()
      disconnectMongoDB()

        return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Productos;