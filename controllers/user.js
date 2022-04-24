const path = require('path');
const User = require(`${path.resolve('./')}/models/user`);
const Data = require(`${path.resolve('./')}/models/data`);
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const config = require('config');
const secret = config.get('secret');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const fs = require('fs');

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

const processData = async (req, res) => {
    const rawdata = fs.readFileSync(`${path.resolve('./')}/data/data.json`);
    const datas = JSON.parse(rawdata);
    const filteredDatas = datas.filter(data => data.randAlphabet === 'a' || data.randAlphabet === 'b');

console.log(req.userId);
}

const getData = async (req, res) => {
}

module.exports = {
    signup,
    processData,
    getData
};
