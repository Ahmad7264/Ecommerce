const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const db = require("../models");
const req = require("express/lib/request");
const User = db.user;


verifyToken = (req, res, next) => {

}

isAdmin = (req, res, next) => {

}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};
module.exports = authJwt;