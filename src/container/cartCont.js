const {conexionMongoDB,disconnectMongoDB} = require('../daos/mongodb');
const cartSchema = require('../schemas/carts');


class Carrito {
  //ok
  async createCarrito() {
    try {
      await conexionMongoDB();
      const data = await cartSchema.create({
        productos: []
        });
      disconnectMongoDB();
        return data._id;
    } catch (error) {
      throw Error(error.message);
    }
  }
//ok
  async buscarCarrito(numeroCarrito) {
    try {
      await conexionMongoDB()
      const data = await cartSchema.findById(numeroCarrito)
      disconnectMongoDB();
        return data;
    } catch (error) {
      throw Error(error.message);
    }
  }

// ok
  async addProductToCart(idCart, idProduct) {
    try {
      await conexionMongoDB()
      const dataCart = await cartSchema.findById(idCart);
      const dataProdu = await Producto.getById(idProduct);
      if (dataCart && dataProdu) {
        await schemaCart.updateOne({ _id: idCart }, { $push: { productos: idProduct } })
   
        return 'se agrego el producto correctamente';
      }
      mongoose.disconnect()
      throw Error('No hay producto en el carrito');
    } catch (error) {
      throw Error(error.message);
    }
  }
//ok
  async deleteCartById(id) {
    try {
      await conexionMongoDB()
      await cartSchema.findByIdAndRemove(id);
      mongoose.disconnect()
      return 'El carrito se borro con exito';
    } catch (error) {
      throw Error(error.message);
    }
  }
//no
  async deleteProductCart(idCart, idProduct) {
    try {
      await conexionMongoDB()
      const produCart = await cartSchema.find({_id:String(idCart)})
      if (produCart) {
        produCart.Productos.pull(idProduct);
        await produCart.save();
        return 'El producto se borro con exito del carrito';
      }
      mongoose.disconnect();

      throw Error('Id does not exist');
    } catch (error) {
      throw Error(error.message);
    }
  }

}

module.exports = Carrito