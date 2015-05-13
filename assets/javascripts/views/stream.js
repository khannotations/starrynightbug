Starry.Views.Stream = Backbone.View.extend({
  initialize: function(options) {
    return this.render();
  },
  template: JST["templates/stream"],
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});