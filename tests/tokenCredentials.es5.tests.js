var expect = require('chai').expect;
var armclient = require('../src');
var tokenCredentials = require('../src/authentication/tokenCredentials');

describe('tokenCredentials module (ES5)', () => {
  it('should be exposed in the module', () => {
    expect(armclient.tokenCredentials)
      .to.be.equal(tokenCredentials.default);
  });
});