const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const user = require(`${path.resolve('./')}/models/user`);
const config = require('config');
const secret = config.get('secret');

module.exports = function() {
    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            session: false
        },
        async (username, password, done) => {
            try {
                const existingUser = await user.findOne({username: username});
                if (!existingUser) {
                    return done(null, false);
                }

                const validate = await existingUser.validatePassword(password);

                if (!validate) {
                    return done(null, false);
                }

                return done(null, existingUser);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use(
        new JwtStrategy(
            {
                secretOrKey: secret,
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            },
            async (token, done) => {
                try {
                    const existingUser = await user.findOne({_id: token.id});

                    if (!existingUser) {
                        return done(null, false);
                    }

                    return done(null, existingUser);
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          cb(null, { username: user.username });
        });
    });

     passport.deserializeUser(function(user, done) {
        process.nextTick(function() {
          return done(null, user);
        });
    });
};
