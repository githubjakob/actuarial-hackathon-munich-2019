const data = require('./data-service/data.service.js');
const mathServer = require('./math-server/math-server.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(data);
  app.configure(mathServer);
};
