const { conexionMongoDB , disconnectMongoDB } = require('../daos/mongodb');
const productSchema = require('../schemas/products');

class Productos {
  
  async save(product) {
    try {
      await conexionMongoDB()
      const data = await productSchema.create(product)
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
      const data = await productSchema.find().lean()
      disconnectMongoDB()

        return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Productos;