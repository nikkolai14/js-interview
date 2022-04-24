const path = require('path');
const User = require(`${path.resolve('./')}/models/user`);
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const config = require('config');
const secret = config.get('secret');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = null;
    let userData = {
        username: req.body.username,
    };

    bcrypt
        .hash(req.body.password, 10)
        .then(hash => {
            userData.password = hash;
        })
        .then(async () => {
           user = await User.create(userData);
        })
        .catch(error => {
            console.log(error)

            return error;
        })
        .finally(error => {
            return generateToken(user, res);
        })
};

const generateToken = (user, res) => {
    jwt.sign({id: user.id}, secret, { expiresIn: '7 days' }, (error, token) => {
        if (error) {
            return res.status(400);
        }

        return res.status(200).json({token});
    });
}

module.exports = {
    signup,
};

