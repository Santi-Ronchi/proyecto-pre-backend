const Cart = require('../container/cartCont')
const contenedorCarro = new Cart()

module.exports = {
    createCart: async (req, res) => {
        const carroAgregado = await contenedorCarro.createCart();
        res.status(200).send({
            status: 200,
            data: carroAgregado,
            message: 'Action OK',
          });
        res.redirect(`/carro/${carroAgregado}`);
    },

    getAllCarts: async (req, res) => {
        const carros = await contenedorCarro.getAll();
        //res.status(200).send({
        //    status: 200,
        //    data: {
        //        carros,
        //    },
        //    message: 'Action OK',
        //  });
        res.render("listaCarro", {productos: carros, req});
    },
    
    deleteAll: async (req, res) => {
        if (req.query.admin) {
            await contenedorCarro.deleteAll();
            res.status(200).send({
                status: 200,
                message: 'DELETE ALL OK',
              });
        }else{
            res.json("ACCION NO AUTORIZADA")
        }
    },

    deleteThisCart: async (req, res) => {
        const exterm = await contenedorCarro.deleteById(req.user.cartID);
        res.status(200).send({
            status: 200,
            data: exterm,
            message: 'DELETE OK',
          });
        res.redirect('/carro');
    },

    getThisCart: async (req, res) => {
        console.log("ENTRE EN GET THIS CART Y: " + req.user.cartID);
        const carroPedido = await contenedorCarro.getById(req.user.cartID);
        res.status(200).send({
            status: 200,
            data: {
                carroPedido
            },
            message: 'Action OK',
          });
          const productos = carroPedido.productos;
        res.render("listaCarro", {productos: productos, req})
    },

    deleteProductFromCart: async (req, res) => {
        const carroPedido = await contenedorCarro.deleteProductById(req.user.cartID, req.params.prodId);
        res.status(200).send({
            status: 200,
            message: 'ITEM DELETED OK',
          });
        res.redirect(`/carro/${req.params.carroId}`)
    },

    addProductToCart: async (req, res) => {
        const prodAgregado = await contenedorCarro.addToCart(req.params.carroId, req.params.prodId);
        res.status(200).send({
            status: 200,
            data: {
                prodAgregado,
            },
            message: 'Action OK',
          });
        res.redirect(`/carro/${req.params.carroId}`);
    },
    
}