// Initializes the `math-server` service on path `/math-server`
const createService = require('./math-server.class.js');
const hooks = require('./math-server.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/math-server', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('math-server');

  service.hooks(hooks);
};
