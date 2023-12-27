/**
 * This file will contain the routes logic for the Product resource
 * 
 */

const { requestValidator, authJwt } = require("../middlewares")

const productController = require("../controllers/product.controller")

module.exports = function(app) {
    app.post("/ecomm/api/v1/product", [requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin], productController.create);

    app.get("/ecomm/api/v1/product", productController.findAll);

    app.get("/ecomm/api/v1/product/:id", productController.findOne);

    app.put("/ecomm/api/v1/product/:id", [requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin], productController.update);

    app.delete("/ecomm/api/v1/product/:id", [authJwt.verifyToken, authJwt.isAdmin], productController.delete);

    app.get("/ecomm/api/v1/categories/:categoryId/products", productController.getProductsUnderCategory);
}
