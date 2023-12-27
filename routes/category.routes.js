/**
 * This file will contain the routing logic for the Category controller
 * 
 */

const { requestValidator, authJwt } = require("../middlewares");

const categoryController = require ("../controllers/category.controller")

module.exports = function(app) {

    // Routes for the POST request to creat a category
    app.post("/ecomm/api/v1/categories", [requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin], categoryController.create);

    // Routes for GET request to fetch all the category
    app.get("/ecomm/api/v1/categories", categoryController.findAll );

    // Routes for the GET request to fetch a category based on Catogory Id
    app.get("/ecomm/api/v1/categories/:id",categoryController.findOne);

    // Routes for the PUT request to update a category based on Catogory Id
    app.put("/ecomm/api/v1/categories/:id", [requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin], categoryController.update);

    // Routes for the DELETE request to delete a category based on Catogory Id
    app.delete("/ecomm/api/v1/categories/:id", [authJwt.verifyToken, authJwt.isAdmin], categoryController.delete);
}