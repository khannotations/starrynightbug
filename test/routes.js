require("../config/env.js"); // Set environment variables
var should = require('should');
var request = require('supertest');
// var mongoose = require('mongoose');
var app = require('express');

describe("Routes", function() {
  var req = request("http://localhost:3000");
  var un = process.env.SNB_USERNAME, pw = process.env.SNB_PASSWORD;

  describe("/", function() {
    it("should send 200", function(done) {
      req.get("/").expect(200, done);
    });
  });

  describe("protected JSON routes", function() {
    var routes = ["/current_user"];
    // Generate tests for each protected JSON route. 
    routes.forEach(function(route) {
      describe(route, function() {
        it("should send 401 and false without credentials", function(done) {
          req.get(route).expect(401, "false", done);
        });

        describe("with credentials", function() {
          if (route === "/current_user") {
            it("should send 200 and true", function(done) {
              req.get(route).auth(un, pw).expect(200, "true", done);
            });
          }

          it("should send 401 when incorrect", function(done) {
            req.get(route).auth("foo", "bar").expect(401, "false", done);
          })
        });
      });
    });
  });

  describe("/login", function() {
    it("should send 401 and false without credentials", function(done) {
      req.get("/login").expect(401, 'Unauthorized', done);
    });

    describe("with credentials", function() {
      it("should send 302", function(done) {
        req.get("/login").auth(un, pw).expect(302,
          'Moved Temporarily. Redirecting to /#/admin', done);
      });

      it("should send 401 when incorrect", function(done) {
        req.get("/login").auth("foo", "bar").expect(401, 'Unauthorized', done);
      })
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
});

