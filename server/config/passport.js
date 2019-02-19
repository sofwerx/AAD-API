const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');


passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
},
(email, password, done) => {
  User.findForLogin({ email }).then((user) => {
    if (!user || !User.validatePassword(user, password)) {
      return done(null, false, { errors: { 'email or password': 'is invalid' } });
    }
    return done(null, user);
  }).catch(done);
}));
