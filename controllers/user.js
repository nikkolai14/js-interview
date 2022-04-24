const path = require('path');
const user = require(`${path.resolve('./')}/models/user`);
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
};

module.exports = {
    signup,
};

