var AWS = require('aws-sdk');
require('./config/env'); // Load environment if in development mode.

var s3 = new AWS.S3({
  accessKeyId: "AKIAIHC7IYIBLOI6WQEA",
  secretAccessKey: "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",
  region: "us-east-1",
});

s3.upload({
  Bucket: 'starrynightbugtest',
  Key: "fromConsole",
  Body: "body1",
  ACL: "public-read"
}, function(err, data) {
  console.log(err, data);
});
