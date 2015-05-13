window.Starry = window.Starry || {
  Models: {},
  Collections: {},
  Views: {},
  Router: Backbone.Router.extend({
    routes: {
      "": "stream",
      "about": "about",
      "album/:name": "album"
    },
    stream: function() {
      this.streamView = new Starry.Views.Stream();
      $("#backbone").html(this.streamView.el);
    }
  })
};