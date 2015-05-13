Starry.Models.Album = Backbone.Model.extend({
  initialize: function() {

  },
  urlRoot: "/api/v1/albums"
});

Starry.Collections.Albums = Backbone.Collection.extend({
  model: Starry.Models.Album,
  url: '/api/v1/albums'
});

Starry.Models.Picture = Backbone.Model.extend({
  initialize: function() {

  },
});