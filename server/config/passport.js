const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');


passport.use(new LocalStrategy({
  usernameField: 'user[username]',
  passwordField: 'user[password]'
},
(username, password, done) => {
  User.findForLogin({ username }).then((user) => {
    if (!user || !User.validatePassword(user, password)) {
      return done(null, false, { errors: { 'Username or Password': 'is Invalid' } });
    }
    return done(null, user);
  }).catch(done);
}));
