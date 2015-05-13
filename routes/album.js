var express = require('express');
var router = express.Router();
var Album = require('../models/Album');

// Just JSON routes

// Index
router.get('/', function(req, res, next) {
  Album.find({}, function(err, albums) {
    console.log(albums);
    res.send(albums || []);
  });
});

// Show
router.get('/:id', function(req, res, next) {
  res.send(Album.findOne({id: req.params.id}));
});

// Create
router.post('/', function(req, res, next) {
  console.log(req.body, req.params);
  Album.create(req.params, function(err, album) {
    res.send(album);
  });
});

// Update
router.post('/:id', function(req, res, next) {
  Album.findOne({id: req.params.id}).update(req.params, function(err, album) {
    res.send(album);
  });
});

// Delete
router.delete('/:id', function(req, res, next) {
  Album.findOne({id: req.params.id}).delete(function(err, album) {
    res.send(album);
  });
});

module.exports = router;
