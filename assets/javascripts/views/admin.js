Starry.Views.Admin = Backbone.View.extend({
  initialize: function(options) {
    this.collection = new Starry.Collections.Albums;
    return this.render();
  },
  template: JST["templates/admin"],
  events: {
    "click #create-album": "createAlbum"
  },
  render: function() {
    var t = this;
    this.$el.html(this.template());
    this.collection.fetch().then(function(albums) {
      console.log("fetched albums", albums);
      t.$el.find("#albums").text(albums);
    });
    return this;
  },

  // Event handlers

  createAlbum: function() {
    var name = this.$el.find("#album-name").val(),
        description = this.$el.find("#album-description").val();
    if (name && description) {
      var album = new Starry.Models.Album({name: name, description: description});
      album.save().success(function(a) {
        console.log("success!", a);
      }).fail(function(err) {
        console.log(err);
      });
    }
  }
});