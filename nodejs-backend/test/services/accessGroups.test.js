const assert = require('assert');
const app = require('../../src/app');

describe('\'accessGroups\' service', () => {
  it('registered the service', () => {
    const service = app.service('accessGroups');

    assert.ok(service, 'Registered the service (accessGroups)');
  });
});
