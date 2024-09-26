const assert = require('assert');
const app = require('../../src/app');

describe('\'systemAccessLevel\' service', () => {
  it('registered the service', () => {
    const service = app.service('systemAccessLevel');

    assert.ok(service, 'Registered the service (systemAccessLevel)');
  });
});
