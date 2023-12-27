// 
//  * This file will contain the logic for the product resource.
//  * Everytime any CRUD request come for the product, methods this can
//  * file will v executed.
// 
const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {



    const product = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost
    }

    Product.create(product)
    .then(product => {
console.log(`product name: [ ${product.name} ] got inserted in db `)
    res.status(200).send(product);

})
    .catch(err => {
        console.log(`Issue in inserting product name: [ ${product.name}]. Error`)
        res.status(500).send({
            message: "Some internal eror while storing the product"
        })
    
    })
}


/**
 * Get a list of all the product
 */

exports.findAll = (req, res) => {
    let productName = req.query.name;
    let minCost = req.query.minCost;
    let maxCost = req.query.maxCost;
    let promise;
     
     if(productName) {
        promise = Product.findAll({
            where: {
                name: productName
            }
        })

     }else if(minCost && maxCost) {
        promise = Product.findAll({
            where: {
                cost: {
                    [Op.gte] : minCost,
                    [Op.lte] : maxCost
                }
            }
        })

     }else if(minCost) {
        promise = Product.findAll({
            where: {
                cost: {
                    [Op.gte] : minCost
                }
            }
        })
     }else if(maxCost) {
        promise = Product.findAll({
            where: {
                cost: {
                    [Op.lte] : maxCost
                }
            }
        })
     
    }else{
        promise = Product.findAll();

     }
     promise
     .then(product => {
        res.status(200).send(product);
     })
     .catch(err => {
        res.status(200).send({
            messagae: "some internal error while fec=tching all the product"
        })
     })
}

exports.findOne = (req, res) => {
    const productId = req.params.id;
    Category.findByPk(productId)
        
    .then(product => {

        if(!product) {
            return res.status(404).json({
                message: 'product not found'
            })
        }
        res.status(200).send(product);
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching the product based on id"
        })
    })
}

exports.update = (req, res) => {


   const product = {
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    categoryId: req.body.categoryId

}

   const productId = req.param.id;

   product.update(product, {
    wherw: {id: productId}
   })
     
   .then(updatedProduct => {
    Product.findByPk(productId)
    .then(product => {
           res.status(200).send(product);
    })
    .catch(err => {
        res.status(500).send({
            message: "Updation happend successfully, but some interal error"
        })
    })
})
   .catch(err => {
    res.status(500).send({
        message: "some internal error while updating details"
    })
})

}

exports.delete = (req, res) => {

    const productId = req.params.id;

    Product.destroy({
        where: {id:productId}
    })
    then( result => {
        res.status(200).send({
            message:"successfully deleted the product"
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while deleting the product"
        })
    })
}




exports.getProductsUnderCategory = (req, res) => {
    const categoryId = parseInt(req.params.categoryId);

    // 

    Product.findAll({
        where: {
            categoryId: categoryId
        }
    })
    .then(products => {
        res.status(200).send(products);
    })
    .catch(err => {
        res.status(500).send({
            message: "some internal error while fethig products based on categoryId"
        })
    })
}