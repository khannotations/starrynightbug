module.exports = function (schema, options) {
  // Add created and updated fields; set them to current time. 
  schema.add({
    created: { type: Date, required: true, default: Date.now() },
    updated: { type: Date, required: true, default: Date.now() },
  });
  // Before save, update updated field
  schema.pre('save', function(next) {
    this.updated = Date.now();
    // Go on
    next();
  });
};