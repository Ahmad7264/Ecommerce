// /** 
//  * This file will be used for the following purpose:
 
//  * 1. Create the DB connection with the help of sequelize
//  * 2. Export all the funtionalities of the model through the file.
//  * One of the advantage of using index.js file is, other file trying to import this file, just need to provide the module name. 

// */
 


const config = require ("../configs/db.config");
const Sequelize = require("sequelize");

/**
 * Creating the db connection
 */

const seq = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = seq;
db.category = require('./category.model.js')(db.sequelize, Sequelize);
db.product = require('./product.model.js')(db.sequelize, Sequelize);
db.user = require('./user.model.js')(db.sequelize, Sequelize);
db.role = require('./role.model.js')(db.sequelize, Sequelize);
db.cart = require('./cart.model.js')(db.sequelize, Sequelize);

/**
 * Establish te relationship between Role & the User
 */

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId"
})

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId"
})

//Relationship B/w Cart and Product : Many to Many

db.product.belongsToMany(db.cart, {
   through: "cart_products",
   foreignKey: "productId" 
});

db.cart.belongsToMany(db.product, {
   through: "cart_products",
   foreignKey: "cartId" 
})

//Relationship b/w Cart and User:

db.user.hasMany(db.cart);

db.ROLES = ["user", "admin"]

module.exports = db;

