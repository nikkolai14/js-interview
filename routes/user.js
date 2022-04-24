const path = require('path');
const express = require('express');
const router = express.Router();
const passport = require('passport')
const user = require(`${path.resolve('./')}/controllers/user`)
const signupValidations = require(`${path.resolve('./')}/validations/user/signupValidations`);

/**
 * Register a user 
 *
 * @apiParam {String} username username as email 
 * @apiParam {String} password Password
 *
 * @apiSuccess {Boolean} state Success response
 */
router.post(
    '/signup',
    signupValidations,
    user.signup
)
