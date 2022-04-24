const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('secret');

const parseUserInJwtToken = (req, res, next) => {
    if (typeof req.headers.authorization !== 'undefined') {
        const token = req.headers.authorization.replace('Bearer', '').trim();
        jwt.verify(token, secret, function(err, decodedToken) {
            if(!err) {
                req.userId = decodedToken.id;
                next();
            }
         });
    }

    next();
}

module.exports = parseUserInJwtToken;
