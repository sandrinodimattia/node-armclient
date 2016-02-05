var expect = require('chai').expect;
var assert = require('chai').assert;

import armclient from '../src';
import clientCredentials from '../src/authentication/clientCredentials';

describe('clientCredentials authentication provider (ES6)', () => {
  it('should be exposed in the module', () => {
    expect(armclient.clientCredentials)
      .to.be.equal(clientCredentials);
  });
  
  it('should require a tenantId', () => {
    const fn = () => {
      armclient.clientCredentials({ 
        
      });
    };
    
    expect(fn)
      .to.throw('Client Credentials authentication requires a tenantId.');
  });
  
  it('should require a clientId', () => {
    const fn = () => {
      armclient.clientCredentials({ 
        tenantId: 'abc',
      });
    };
    
    expect(fn)
      .to.throw('Client Credentials authentication requires a clientId.');
  });
  
  it('should require a clientId', () => {
    const fn = () => {
      armclient.clientCredentials({ 
        tenantId: 'abc',
      });
    };
    
    expect(fn)
      .to.throw('Client Credentials authentication requires a clientId.');
  });
  
  it('should require a servicePrincipalPassword', () => {
    const fn = () => {
      armclient.clientCredentials({ 
        tenantId: 'abc',
        clientId: 'abc'
      });
    };
    
    expect(fn)
      .to.throw('Client Credentials authentication requires a clientSecret or servicePrincipalPassword.');
  });
  
  it('should initialize with options', () => {
    const cred = armclient.clientCredentials({ 
      tenantId: 'abc',
      clientId: 'abc',
      clientSecret: '123'
    });
    
    assert.isFunction(cred);
  });
  
  it('should initialize with options and servicePrinicpalPassword', () => {
    const cred = armclient.clientCredentials({ 
      tenantId: 'abc',
      clientId: 'abc',
      servicePrincipalPassword: '123'
    });
    
    assert.isFunction(cred);
  });
});