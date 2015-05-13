var path = require('path');
var os = require('os');
var mongoose = require('mongoose');
var timestamps = require('./_timestamps');
var attachments = require('mongoose-attachments-localfs');

var pictureSchema = new mongoose.Schema({
  album: { type: mongoose.Schema.ObjectId, ref: 'Album', required: true },
  date_taken: Date,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number]
  },
  comment: { type: String, default: "" },
});

pictureSchema.plugin(attachments, {
  directory: os.tmpDir(),
  storage: {
    providerName: "localfs"
  },
  properties: {
    image: {
      styles: {
        original: {}, // Keep original
        thumbnail: {
          thumbnail: "100x100^",
          gravity: "center",
          extent: "100x100"
        }
      }
    }
  }
});

pictureSchema.virtual("original").get(function() {
  return path.join("square", path.basename(this.image.original.path));
});
pictureSchema.virtual("thumbnail").get(function() {
  return path.join("thumbnail", path.basename(this.image.thumbnail.path));
});

pictureSchema.plugin(timestamps);

module.exports = mongoose.model('Picture', pictureSchema);