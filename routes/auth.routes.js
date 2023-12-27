const controller = require("../controllers/auth.controller");
const { verifySignup } = require("../middlewares");

module.exports = function(app) {

    app.post("/ecomm/api/v1/auth/signup", [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted] , controller.signup);
    app.post("/ecomm/api/v1/auth/signin", controller.signin);
};