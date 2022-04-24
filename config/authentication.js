const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require(`${path.resolve('./')}/models/user`);
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
                const user = await User.findOne({where: {username: username}});
                if (user === null) {
                    return done(null, false);
                }

                const validate = await user.validatePassword(password);

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
                    const user = await User.findOne({where: {_id: token.id}});

                    if (user === null) {
                        return done(null, false);
                    }

                    return done(null, user);
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
