// Initializes the `brands` service on path `/v1/brands`
const createService = require('./aggregator.class.js');
const hooks = require('./aggregator.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('aggregator', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('aggregator');

  service.hooks(hooks);
};

