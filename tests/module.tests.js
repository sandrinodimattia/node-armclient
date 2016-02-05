var expect = require('chai').expect;

import ArmClient from '../src';
import ArmClientInternal from '../src/ArmClient';
import ArgumentError from '../src/errors/ArgumentError';

describe('armclient module (ES6)', () => {
  it('should allow initialization of the ArmClient', () => {
    const client = ArmClient({ 
      subscriptionId: '123',
      auth: { }
    });
    
    expect(client)
      .to.be.an.instanceof(ArmClientInternal);
  });
  
  it('should require an authentication provider', () => {
    const fn = () => {
      ArmClient({ 
        subscriptionId: '123'
      });
    };
    
    expect(fn)
      .to.throw('An authentication provider must be configured.');
  });
  
  it('should require a subscriptionId', () => {
    const fn = () => {
      ArmClient({ 
        auth: { }
      });
    };
    
    expect(fn)
      .to.throw('The ARM client requires a subscriptionId.');
  });
});