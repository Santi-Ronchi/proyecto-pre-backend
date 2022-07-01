const Cart = require('../container/cartCont')
const thisCart = new Cart()

module.exports = {
    showThisCart: async (req, res) => {
        try {
            const productos = []
            if (_id) {
                const carrito = req.body._id
                const data = await thisCart.buscarCarrito(carrito)
                productos.push(data)
            }else{
                await thisCart.createCarrito()
            }
            res.render('carrito', {productos})
        } catch (error) {
            res.status(500).send({
            status: 500,
            messages: error.message,
            });
        }
    }
}


