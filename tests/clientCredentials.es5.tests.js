var expect = require('chai').expect;
var armclient = require('../src');
var clientCredentials = require('../src/authentication/clientCredentials');

describe('clientCredentials module (ES5)', () => {
  it('should be exposed in the module', () => {
    expect(armclient.clientCredentials)
      .to.be.equal(clientCredentials.default);
  });
});