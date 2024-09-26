const assert = require('assert');
const app = require('../../src/app');

describe('\'accessGroupRoomMap\' service', () => {
  it('registered the service', () => {
    const service = app.service('accessGroupRoomMap');

    assert.ok(service, 'Registered the service (accessGroupRoomMap)');
  });
});
