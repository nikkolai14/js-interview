eonst {check} = require('express-validator');

const signupValidations = [
    check('username')
        .notEmpty()
        .withMessage((value, { req, location, path }) => {
            return req.t('validation_not_empty_message');
        }),
        .isEmail()
        .withMessage((value, { req, location, path }) => {
            return req.t('validation_email_format_invalid');
        })
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
