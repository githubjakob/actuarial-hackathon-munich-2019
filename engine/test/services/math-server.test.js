const app = require('../../src/app');

describe('\'math-server\' service', () => {
  it('registered the service', () => {
    const service = app.service('math-server');
    expect(service).toBeTruthy();
  });
});
