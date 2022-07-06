const {conexionMongoDB,disconnectMongoDB} = require('../daos/mongodb');
const cartSchema = require('../schemas/carts');
const ProductoModel = require('./productCont');
const products = new ProductoModel();

class Cart {

    async createCart() {
        try {
          await conexionMongoDB();
          const data = await cartSchema.create({
            id: Math.floor(Math.random() * 10000000000),
            productos: [],
          });
          await disconnectMongoDB();
          return data.id;
        } catch (error) {
          throw Error(error.message);
        }
    }

    async getById(numero) {
        try {
            await conexionMongoDB();
            const data = await cartSchema.findById(numero);
            await disconnectMongoDB();
            const productList = data.productos
            return productList;
          } catch (error) {
            throw Error(error.message);
          }
    }

    async addToCart(cartId, prodId) {
        try {
            await conexionMongoDB()
              await cartSchema.updateOne({ _id: cartId }, { $push: { productos: prodId } })
            await disconnectMongoDB();
              return 'Product Added to Cart OK';
          } catch (error) {
            throw Error(error.message);
          }
    }

    async deleteById(numero) {
        try {
            await conexionMongoDB()
            await cartSchema.findByIdAndRemove(numero);
            await disconnectMongoDB();
            return 'Cart Deleted OK';
          } catch (error) {
            throw Error(error.message);
          }
    }

    async deleteProductById(cartId, prodId) {
        try {
            await conexionMongoDB()
            await cartSchema.updateOne({ _id: cartId }, { $pull: { productos: prodId } })
            await disconnectMongoDB();
          } catch (error) {
            throw Error(error.message);
          }
    }
}

module.exports = Cart;