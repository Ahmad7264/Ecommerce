
const db = require("../models");
const config = require("../configs/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = (req, res) => {

    User.create({
        username: req.body.username,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        console.log("User created");
        if(req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or] : req.body.roles
                    }
                }
            })
            .then(roles => {
                user.setRoles(roles)
                .then(() => {
                    res.send({message: "User registered successfully !"})
                })
            })
        }else{
            user.setRoles([1]).then(() => {
                res.send({message: "User registered successfully !"})
            })
        }
    })
    .catch(err => {
        res.send(500).send({message: err.message});
    })
}

exports.signin = (req, res) => {

    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        // Checking if the username is valid
        if(!user) {
            return res.status(404).send({message: "User not found"});

        }

        // Checking if the password is valid.

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) {
            return res.status(401).send({message: "Invalid password"})

        }

        // If both are valid, creating the token.

        var token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 //24 hours

        });

        res.status(200).send({
             id: user.id,
             username: user.username,
             email: user.email,
             accessToken: token
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    })
};