const app = require('../../src/app');

describe('\'data\' service', () => {
  it('registered the service', () => {
    const service = app.service('data');
    expect(service).toBeTruthy();
  });
});
