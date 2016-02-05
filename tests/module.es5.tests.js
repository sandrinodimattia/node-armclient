var expect = require('chai').expect;
var armclient = require('../src');
var ArmClientClass = require('../src/ArmClient');

describe('armclient module (ES5)', function () {
  it('should allow initialization of the ArmClient', function () {
    var client = armclient({ 
      subscriptionId: '123',
      auth: { }
    });
    
    expect(client)
      .to.be.an.instanceof(ArmClientClass.default);
  });
});