// Secret variables that are loaded from the environment.
// In development, load the env.js file (gitignored) first.
module.exports = {
  db: process.env.MONGOLAB_URI,
  test_db: "mongodb://localhost:27017/starrynightbug_test",
  sessionSecret: process.env.SESSION_SECRET,
  // AWS
  username: process.env.SNB_USERNAME,
  password: process.env.SNB_PASSWORD
};
