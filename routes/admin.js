var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: "Admin | SNB" });
});

router.post('/albums', function(req, res, next) {

});

router.put('/albums/:id', function(req, res, next) {
  console.loq(req.body);
});

module.exports = router;
