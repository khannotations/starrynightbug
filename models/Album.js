var mongoose = require('mongoose');
var timestamps = require('./_timestamps');
var Picture = require('./Picture');

var albumSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, default: "" },
});

albumSchema.plugin(timestamps);

albumSchema.methods.pictures = function() {
  return Picture.find({ album: this._id });
}

module.exports = mongoose.model('Album', albumSchema);