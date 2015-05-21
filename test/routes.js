require("../config/env.js"); // Set environment variables
var should = require('should');
var request = require('supertest');
// var mongoose = require('mongoose');
var app = require('express');

describe("Routes", function() {
  var req = request("http://localhost:3000");
  var un = process.env.SNB_USERNAME, pw = process.env.SNB_PASSWORD;

  // before(function(done) {
  //   // In our tests we use the test db
  //   mongoose.connect("mongodb://localhost:27017/starrynightbug_test");              
  //   done();
  // });

  describe("/", function() {
    it("should send 200", function(done) {
      req.get("/").expect(200, done);
    });
  });

  describe("/admin", function() {
    it("should send 401 without credentials", function(done) {
      req.get("/admin").expect(401, done);
    });

    describe("with credentials", function() {
      it("should send 200", function(done) {
        req.get("/admin").auth(un, pw).expect(200, done);
      });

      it("should send 401 when incorrect", function(done) {
        req.get("/admin").auth("foo", "bar").expect(401, done);
      })
    });
  });

  describe("/api/v1", function() {
    describe("albums", function() {
      it("should send 200 without credentials", function(done) {
        req.get("/api/v1/albums").expect(200, done);
      });
    });
  });

  // after(function(done) {
  //   mongoose.disconnect();
  //   done();
  // });
});

