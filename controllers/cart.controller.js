
const { STATUS } = require("../configs/cart.status.config");
const db = require("../models");
const Product = db.product;
const Cart = db.cart;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    const cart = {
        userId: req.userId,
        status: STATUS.CREATION
    };
    Cart.create(cart)
    .then(cart => {
        res.status(201).send(cart);
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal serverm error happend"
        })
    })
}

exports.update = (req, res) => {
    const cartId = req.params.id;
    
    Cart.findByPk(cartId)
    .then(cart => {
        product.findAll({
            where: {
                id: req.body.productIds
            }
        })
        .then(items => {
            if(!items) {
                res.status(400).send({
                    message: "Items trying to add does not exist"
                })
            }
            cart.setProducts(items)
            .then(() => {
                var cost = 0;
                const ProductSelected = [];
                cart.getProduct().then(products => {
                    
                    for(i = 0; i < products.length; i++) {
                        cost = cost + products[i].cost;
                        ProductSelected.push({
                            id: products[i].id,
                            name: products[i].name,
                            cost: products[i].cost
                        });
                    }

                    res.status(200).send({
                        id: cart.id,
                        ProductSelected: ProductSelected,
                        cost: cost
                    })
                })

            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Some internal server error happened while fetching cart details"
            })
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal server error happened while fetching cart details"
        })
    })

}

exports.getCart = (req, res) => {

    Cart.findByPk(req.params.cartId). then(cart => {
        var cost = 0;
        const ProductSelected = [];
        cart.getProduct().then(products => {
            
            for(i = 0; i < products.length; i++) {
                cost = cost + products[i].cost;
                ProductSelected.push({
                    id: products[i].id,
                    name: products[i].name,
                    cost: products[i].cost
                });
            }

            res.status(200).send({
                id: cart.id,
                ProductSelected: ProductSelected,
                cost: cost,
                status: cart.status
            })
        })

    })

    
}

exports.delete = (req, res) => {


    const cartId = req.params.cartId;

    Cart.destroy({
        where: {id: cartId}
    })
    .then(result => {
        res.status(200).send({
            message: "Successfully deleted the Cart"
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while deleting the cart based on id"
        })
    })


}



exports.changeCartStatus = (req, res ) => {

    const cart = {
        id : req.params.cartId,
        status : req.params.status,
        userId : req.userId
    };

    const cartId = req.params.cartId
    Cart.update(cart, {
        where: {id: cartId}
    })
    .then(updatedcart => {

        Cart.findByPk(cartId)
        .then(cart => {
            res.status(200).send(cart);
        })
        .catch(err => {
            res.status(500).send({
                message: "Some internal error while fetching the cart based on id"
            })
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while updating the cart based on id"
        })
    })

}