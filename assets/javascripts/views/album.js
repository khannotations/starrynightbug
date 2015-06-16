Starry.Views.Album = Backbone.View.extend({
  initialize: function() {
    console.log(this.model);
    var t = this;
    this.model.fetch().then(function(a) {
      console.log("fetch", a, t.model);
    });
    return this.render();
  },
  template: JST["templates/album"],

  events: {
    "click #upload-picture": "uploadPictures"
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  // Event handlers

  uploadPictures: function() {
    console.log("pics", $("#picture-uploads"));
  }
});
