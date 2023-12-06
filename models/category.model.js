/**
 * This file will be used to represent the category schema
 * 
 * Category fields:
 * 1. id 
 * 2. name
 * 3. description
 */


module.exports = (sequelize, Sequelize) =>{
    
const Category = Sequelize.define("category", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    }
});
return Category;
}