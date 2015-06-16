window.Starry = window.Starry || {
  Models: {},
  Collections: {},
  Views: {},
  Router: Backbone.Router.extend({
    routes: {
      "": "stream",
      "admin": "admin",
      "about": "about",
      "albums/:name": "album"
    },
    stream: function() {
      this.streamView = new Starry.Views.Stream();
      $("#backbone").html(this.streamView.el);
    },

    admin: function() {
      this.ensureCurrentUser(function() {
        $("#backbone").html(new Starry.Views.Admin().el);
      });
    },

    album: function(name) {
      $("#backbone").html(new Starry.Views.Album({
        model: new Starry.Models.Album({name: name})
      }).el);
    },

    // Helpers
    ensureCurrentUser: function(callback) {
      var t = this;
      $.get("/current_user").success(function(user) {
        if (!user) {
          return t.unauthorizedRoute();
        }
        callback.apply(this);
      }).fail(this.unauthorizedRoute.bind(this));
    }, 
    unauthorizedRoute: function() {
      // TODO: Flash message.
      console.log("Unauthorized");
      this.navigate("#/");
      return this;
    }
  })
};