const path = require('path');
const {check} = require('express-validator');
const User = require(`${path.resolve('./')}/models/user`);

const signupValidations = [
    check('username')
        .notEmpty()
        .withMessage((value, { req, location, path }) => {
            return req.t('validation_not_empty_message');
        })
        .isEmail()
        .withMessage((value, { req, location, path }) => {
            return req.t('validation_email_format_invalid');
        })
        .bail()
        .custom(async (value, { req }) => {
            const user = await User.findOne({where: {username: req.body.username}})
            if (user) {
                return Promise.reject(req.t('validation_email_unique'));
            }
        })
        .withMessage((value, { req, location, path }) => {
            return req.t('validation_email_unique');
        }),
    check('password')
        .notEmpty()
        .withMessage((value, { req, location, path }) => {
            return req.t('validation_not_empty_message');
        })
        .bail()
        .isStrongPassword()
        .withMessage((value, { req, location, path }) => {
            return req.t('validation_password_not_strong');
        }),
];

module.exports = signupValidations;
