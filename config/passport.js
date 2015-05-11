var passport = require('passport');
var secrets = require('./secrets.js');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(function(username, password, done) {
  if (username.valueOf() == secrets.username &&
      password.valueOf() == secrets.password) {
    return done(null, true);
  } else {
    return done(null, false);
  }
}));
