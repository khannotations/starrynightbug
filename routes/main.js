var express = require('express');
var router = express.Router();
var passport = require('passport');

function ensureAuthenticated(req, res, next, callback) {
  var t = this;
  
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/current_user', function(req, res, next) {
  passport.authenticate('basic', {session: false}, function(err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.status(401).send(false); }
    res.send(true);
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  res.status(401).redirect('/');
  // res.redirect('/');
})

module.exports = router;
