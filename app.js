/**
 * Set up app
 */
var express = require('express');
var app = express();
if (app.get('env') == 'development') {
  require('./config/env'); // Load environment if in development mode.
}
// Standard middleware
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connectAssets = require('connect-assets'); // Asset pipeline
// Authentication
var secrets = require('./config/secrets');
var passport = require('passport');
var passportConfig = require ('./config/passport'); // Passport configuration
// Database
var mongoose = require('mongoose');

/**
 * Connect to MongoDB.
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

/**
 * Views
 */ 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Rails-like asset pipeline with connect-assets.
// Compiles .less files automatically.
app.use(connectAssets({
  paths: [
    path.join(__dirname, 'assets/stylesheets'), // CSS
    path.join(__dirname, 'assets/javascripts'), // Javascript
    path.join(__dirname, 'assets/templates'),   // Backbone templates
    path.join(__dirname, 'bower_components')    // Bower components
  ]
}));
// Leave public routes open for fonts and images
app.use(express.static(path.join(__dirname, 'public')));

// Start passport
app.use(passport.initialize());

/**
 * Routes
 */

var main = require('./routes/main');
var admin = require('./routes/admin');
var albums = require('./routes/album');

app.use('/', main);
app.use('/login', passport.authenticate('basic', {session: false}), main);
// app.use('/current_user', passport.authenticate('basic', {session: false}), main);
app.use('/api/v1/albums', albums);
app.use('/admin', passport.authenticate('basic', {session: false}), admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
