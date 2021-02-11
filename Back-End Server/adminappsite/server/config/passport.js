var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../model/user');
var config = require('../config/database'); // get db config file

passport.use(new LocalStrategy({
    usernameField: 'username'
  },
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (user.comparePassword(password) === false) {

        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });


}));
