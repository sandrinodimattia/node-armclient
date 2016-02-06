import nock from 'nock';
import Promise from 'bluebird';
import { expect } from 'chai';

import ArmClient from '../src';
import { MANAGEMENT_ENDPOINT } from '../src/constants';

describe('ArmClient', () => {
  const client = ArmClient({ 
    subscriptionId: '123',
    auth: () => new Promise((resolve, reject) => {
      resolve('mytoken');
    })
  });
  
  beforeEach(() => {
    nock.cleanAll();
  });
  
  describe('#get', () => {
    it('should send the querystring', (done) => {
      var request = nock(MANAGEMENT_ENDPOINT)
        .matchHeader('Authorization', 'Bearer mytoken')
        .get('/subscriptions/123/foo?api-version=123')
        .reply(200, 'OK');
          
      client.get('/foo', { 'api-version': 123 })
        .then((res) => {
          expect(request.isDone()).to.be.true;
          done();
        });
    });
    
    it('should send the authorization header', (done) => {
      var request = nock(MANAGEMENT_ENDPOINT)
        .matchHeader('Authorization', 'Bearer mytoken')
        .get('/subscriptions/123/foo')
        .reply(200, 'OK');
          
      client.get('/foo')
        .then((res) => {
          expect(request.isDone()).to.be.true;
          done();
        });
    });
    
    it('should return the response body', (done) => {
      var request = nock(MANAGEMENT_ENDPOINT)
        .get('/subscriptions/123/foo?api-version=123')
        .reply(200, { 'a': 'b' });
          
      client.get('/foo', { 'api-version': 123 })
        .then((res) => {
          expect(request.isDone()).to.be.true;
          expect(res.body.a).to.equal('b');
          done();
        });
    });
    
    it('should return the response headers', (done) => {
      var request = nock(MANAGEMENT_ENDPOINT)
        .get('/subscriptions/123/foo')
        .reply(200, { 'a': 'b' }, {
          'x-ms-requestid': '123456'
        });
          
      client.get('/foo')
        .then((res) => {
          expect(request.isDone()).to.be.true;
          expect(res.headers['x-ms-requestid']).to.equal('123456');
          done();
        });
    });
    
    it('should return the error details', (done) => {
      var request = nock(MANAGEMENT_ENDPOINT)
        .get('/subscriptions/123/foo')
        .reply(400, { 'reason': 'invalid request' });
          
      client.get('/foo')
        .catch((err) => {
          expect(request.isDone()).to.be.true;
          expect(err).not.to.be.null;
          expect(err.status).to.equal(400);
          expect(err.details.reason).to.equal('invalid request');
          done();
        });
    });
  });
  
  describe('#post', () => {
    it('should send the request body', (done) => {
      const payload = {
        vmName: 'My-VM'
      };
      
      var request = nock(MANAGEMENT_ENDPOINT)
        .post('/subscriptions/123/vm/create?api-version=123', payload)
        .reply(201);
          
      client.post('/vm/create', { 'api-version': 123 }, payload)
        .then((res) => {
          expect(request.isDone()).to.be.true;
          done();
        });
    });
  });
  
  describe('#put', () => {
    it('should send the request body', (done) => {
      const payload = {
        vmName: 'My-VM'
      };
      
      var request = nock(MANAGEMENT_ENDPOINT)
        .put('/subscriptions/123/vm/create?api-version=123', payload)
        .reply(201);
          
      client.put('/vm/create', { 'api-version': 123 }, payload)
        .then((res) => {
          expect(request.isDone()).to.be.true;
          done();
        });
    });
  });
  
  describe('#del', () => {
    it('should send the request body', (done) => {
      const payload = {
        vmName: 'My-VM'
      };
      
      var request = nock(MANAGEMENT_ENDPOINT)
        .delete('/subscriptions/123/vm/create?api-version=123', payload)
        .reply(201);
          
      client.del('/vm/create', { 'api-version': 123 }, payload)
        .then((res) => {
          expect(request.isDone()).to.be.true;
          done();
        });
    });
  });
  
  describe('#provider', () => {
    describe('#get', () => {
      it('should be supported', (done) => {
        var request = nock(MANAGEMENT_ENDPOINT)
          .get('/subscriptions/123/resourceGroups/myrg/providers/Microsoft.Compute/vm/create?api-version=123')
          .reply(201);
            
        client.provider('myrg', 'Microsoft.Compute')
          .get('/vm/create', { 'api-version': 123 })
          .then((res) => {
            expect(request.isDone()).to.be.true;
            done();
          });
      });
    });
    
    describe('#post', () => {
      it('should be supported', (done) => {
        const payload = { vmName: 'My-VM' };
        
        var request = nock(MANAGEMENT_ENDPOINT)
          .post('/subscriptions/123/resourceGroups/myrg/providers/Microsoft.Compute/vm/create?api-version=123', payload)
          .reply(201);
            
        client.provider('myrg', 'Microsoft.Compute')
          .post('/vm/create', { 'api-version': 123 }, payload)
          .then((res) => {
            expect(request.isDone()).to.be.true;
            done();
          });
      });
    });
    
    describe('#put', () => {
      it('should be supported', (done) => {
        const payload = { vmName: 'My-VM' };
        
        var request = nock(MANAGEMENT_ENDPOINT)
          .put('/subscriptions/123/resourceGroups/myrg/providers/Microsoft.Compute/vm/create?api-version=123', payload)
          .reply(201);
            
        client.provider('myrg', 'Microsoft.Compute')
          .put('/vm/create', { 'api-version': 123 }, payload)
          .then((res) => {
            expect(request.isDone()).to.be.true;
            done();
          });
      });
    });
    
    describe('#delete', () => {
      it('should be supported', (done) => {
        const payload = { vmName: 'My-VM' };
        
        var request = nock(MANAGEMENT_ENDPOINT)
          .delete('/subscriptions/123/resourceGroups/myrg/providers/Microsoft.Compute/vm/create?api-version=123', payload)
          .reply(201);
            
        client.provider('myrg', 'Microsoft.Compute')
          .del('/vm/create', { 'api-version': 123 }, payload)
          .then((res) => {
            expect(request.isDone()).to.be.true;
            done();
          });
      });
    });
  });
});