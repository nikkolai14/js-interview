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
 * @apiSuccess {String} token Generated JWT token for authorization 
 */
router.post(
    '/signup',
    signupValidations,
    user.signup
)

/**
 *  process data by user 
 *
 * @apiHeader {String} Authorization Bearer Token
 * 
 * @apiSuccess {Boolean} state Success response
 */
router.post(
    '/process',
    passport.authenticate('jwt', { session: false }),
    user.processData
)

/**
 *  fetch data of user 
 *
 * @apiHeader {String} Authorization Bearer Token
 *
 * @apiSuccess {String[]} data list of users
 */
router.get(
    '/fetch',
    passport.authenticate('jwt', { session: false }),
    user.getData
)

module.exports = router;
