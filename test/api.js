require("../config/env.js"); // Set environment variables
var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');

var Album = require('../models/Album');

describe("Albums", function() {
  var req = request("http://localhost:3000");
  var un = process.env.SNB_USERNAME, pw = process.env.SNB_PASSWORD;
  var albums = [{_id: "1"}], stubs = [{
    name: "First",
    description: "first"
  }, {
    name: "Second",
    description: "second"
  }];

  before(function(done) {
    console.log("BEFORE");
    // In our tests we use the test db
    mongoose.connect("mongodb://localhost:27017/starrynightbug_test");  
    Album.create(stubs, function(err, as) {
      if (err) { throw new Error(err); }
      console.log("IN CALLBACK", err, as);

      albums = as;
      done();
    });            
  });

  describe("#index", function() {
    it("should send 200 and all albums", function(done) {
      Album.find({}, function(err, as) {
        // should(albums).equal(as);
      })
      req.get("/api/v1/albums").expect(200, albums, done);
    });
  });

  describe("#show", function() {
    var id = albums[0]._id;
    it("should send 200 and given album", function(done) {
      req.get("/api/v1/albums/" + id).expect(200, albums[0], done);
    });
  })

  describe("#create", function() {
    it("sends 401 without credentials", function(done) {
      req.post("/api/v1/albums").expect(401);
      done();
    });

    it("sends 200 with credentials", function(done) {
      req.post("/api/v1/albums").auth(un, pw).expect(200);
      done();
    });
  });

  describe("#update", function() {
    var id = albums[0]._id;
    it("sends 401 without credentials", function(done) {
      req.put("/api/v1/albums/" + id).expect(401);
      done();
    });

    it("sends 200 with credentials", function(done) {
      req.put("/api/v1/albums/" + id).auth(un, pw).expect(200);
      done();
    });
  });

  describe("#destroy", function() {
    var id = albums[0]._id;
    it("sends 401 without credentials", function(done) {
      req.delete("/api/v1/albums/" + id).expect(401);
      done();
    });

    it("sends 200 with credentials", function(done) {
      req.delete("/api/v1/albums/" + id).auth(un, pw).expect(200);
      done();
    });
  });

  after(function(done) {
    Album.remove({}).exec();
    done();
  });
});

