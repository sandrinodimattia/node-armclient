var expect = require('chai').expect;
var assert = require('chai').assert;

import armclient, { clientCredentials } from '../src';
import clientCredentialsInternal from '../src/authentication/clientCredentials';

describe('clientCredentials authentication provider (ES6)', () => {
  it('should be exposed in the module', () => {
    expect(armclient.clientCredentials)
      .to.be.equal(clientCredentialsInternal);
  });
  
  it('should require a tenantId', () => {
    const fn = () => {
      clientCredentials({ 
        
      });
    };
    
    expect(fn)
      .to.throw('Client Credentials authentication requires a tenantId.');
  });
  
  it('should require a clientId', () => {
    const fn = () => {
      clientCredentials({ 
        tenantId: 'abc',
      });
    };
    
    expect(fn)
      .to.throw('Client Credentials authentication requires a clientId.');
  });
  
  it('should require a clientId', () => {
    const fn = () => {
      clientCredentials({ 
        tenantId: 'abc',
      });
    };
    
    expect(fn)
      .to.throw('Client Credentials authentication requires a clientId.');
  });
  
  it('should require a servicePrincipalPassword', () => {
    const fn = () => {
      clientCredentials({ 
        tenantId: 'abc',
        clientId: 'abc'
      });
    };
    
    expect(fn)
      .to.throw('Client Credentials authentication requires a clientSecret or servicePrincipalPassword.');
  });
  
  it('should initialize with options', () => {
    const cred = clientCredentials({ 
      tenantId: 'abc',
      clientId: 'abc',
      clientSecret: '123'
    });
    
    assert.isFunction(cred);
  });
  
  it('should initialize with options and servicePrinicpalPassword', () => {
    const cred = clientCredentials({ 
      tenantId: 'abc',
      clientId: 'abc',
      servicePrincipalPassword: '123'
    });
    
    assert.isFunction(cred);
  });
});