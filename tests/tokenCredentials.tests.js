var expect = require('chai').expect;
var assert = require('chai').assert;

import armclient from '../src';
import tokenCredentials from '../src/authentication/tokenCredentials';

describe('tokenCredentials authentication provider (ES6)', () => {
  it('should be exposed in the module', () => {
    expect(armclient.tokenCredentials)
      .to.be.equal(tokenCredentials);
  });
  
  it('should require an accessToken', () => {
    const fn = () => {
      armclient.tokenCredentials({ 
        
      });
    };
    
    expect(fn)
      .to.throw('Token Credentials authentication requires an accessToken.');
  });
  
  it('should initialize with options', () => {
    const cred = armclient.tokenCredentials({ 
      accessToken: 'abc'
    });
    
    assert.isFunction(cred);
  });
});