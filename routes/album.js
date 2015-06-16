var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var Album = require('../models/Album');

// Just JSON routes

restify.serve(router, Album, {
  prefix: '/api',
  version: '/v1',
  idProperty: 'name',
  prereq: function(req, res, next) {
    // TODO: ensure authentication
    // passport.authenticate('basic', {session: false});
    return true; 
  },
  plural: true,
  lowercase: true
});

router.get('/api/v1/albums/:id/pictures', function(req, res, next) {

});

// // Index
// router.get('/', function(req, res, next) {
//   Album.find({}, function(err, albums) {
//     res.json(albums || []);
//   });
// });

// // Show
// router.get('/:id', function(req, res, next) {
//   console.log(req.params.id);
//   Album.findById(req.params.id, function(err, album) {
//     if (err) { return next(err); }
//     res.json(album);
//   });
// });

// // Create - authentication required
// router.post('/', passport.authenticate('basic', {session: false}),
//   function(req, res, next) {
//     Album.create({name: req.body.name, description: req.body.description},
//       function(err, album) {
//         if (err) { return next(err); }
//         res.json(album);
//       }
//     );
//   }
// );

// // Update - authentication required
// router.put('/:id', function(req, res, next) {
//   Album.findById(req.body.id).update(
//     {name: req.body.name, description: req.body.description},
//     function(err, album) {
//       if (err) { return next(err); }
//       res.json(album);
//     }
//   );
// });

// // Delete - authentication required
// router.delete('/:id', function(req, res, next) {
//   Album.findById(req.params.id).remove(function(err, album) {
//     if (err) { return next(err); }  
//     res.json(album);
//   });
// });

module.exports = router;
