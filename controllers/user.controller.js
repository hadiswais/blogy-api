const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req, res) {

    try {
        const checkUser = await models.User.findOne({ where: { email: req.body.email } });
        if (checkUser) {
            res.status(409).json({
                message: "Email already exists!",
            });
        } else {
            bcryptjs.genSalt(10, function (err, salt) {

                bcryptjs.hash(req.body.password, salt, async function (err, hash) {
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        role: 2
                    };
                    const newUser = await models.User.create(user);
                    res.status(201).json({ message: "User created successfully", newUser });
                });
            });

        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function login(req, res) {
    try {
        const user = await models.User.findOne({ where: { email: req.body.email } })
        if (user === null) {
            res.status(401).json({ message: "Invalid credentials!", });
        } else {
            bcryptjs.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id,
                        role: user.role
                    }, process.env.JWT_KEY, function (err, token) {
                        res.status(200).json({
                            message: "Authentication successful!",
                            token: token
                        });
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid credentials!",
                    });
                }
            });
        }


    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    register: register,
    login: login
} 
