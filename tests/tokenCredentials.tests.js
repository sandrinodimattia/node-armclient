var expect = require('chai').expect;
var assert = require('chai').assert;

import ArmClient, { tokenCredentials } from '../src';
import tokenCredentialsInternal from '../src/authentication/tokenCredentials';

describe('tokenCredentials authentication provider (ES6)', () => {
  it('should be exposed in the module', () => {
    expect(tokenCredentials)
      .to.be.equal(tokenCredentialsInternal);
  });
  
  it('should require an accessToken', () => {
    const fn = () => {
      tokenCredentials({ 
        
      });
    };
    
    expect(fn)
      .to.throw('Token Credentials authentication requires an accessToken.');
  });
  
  it('should initialize with options', () => {
    const cred = tokenCredentials({ 
      accessToken: 'abc'
    });
    
    assert.isFunction(cred);
  });
});