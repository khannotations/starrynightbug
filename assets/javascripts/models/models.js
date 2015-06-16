Starry.Models.Album = Backbone.Model.extend({
  // Backbone-forms schema
  // schema: {
  //   name: {
  //     type: 'Text',
  //     validators: ['required'],
  //     editorAttrs: [maxlength: 30]
  //   },
  //   description: {
  //     type: 'TextArea', 
  //     validators: ['required']
  //   }
  // },
  urlRoot: "/api/v1/albums",
  url: function() {
    return this.urlRoot + "/" + this.get('name');
  }
});

Starry.Collections.Albums = Backbone.Collection.extend({
  model: Starry.Models.Album,
  url: '/api/v1/albums'
});

Starry.Models.Picture = Backbone.Model.extend({
  
});