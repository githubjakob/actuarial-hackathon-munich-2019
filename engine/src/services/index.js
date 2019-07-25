const data = require('./data/data.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(data);
};
