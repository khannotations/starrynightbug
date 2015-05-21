Starry.Views.Admin = Backbone.View.extend({
  initialize: function(options) {
    return this.render();
  },
  template: JST["templates/admin"],
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});