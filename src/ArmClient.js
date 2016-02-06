
import request from 'superagent';
import ArgumentError from './errors/ArgumentError';
import { MANAGEMENT_ENDPOINT } from './constants';

export default class ArmClient {
  constructor(options) {
    options.managementEndpoint = options.managementEndpoint || MANAGEMENT_ENDPOINT;
    if (!options.managementEndpoint || options.managementEndpoint.length === 0) {
      throw new ArgumentError('The ARM client requires a managementEndpoint.');
    }
    
    if (!options.subscriptionId || options.subscriptionId.length === 0) {
      throw new ArgumentError('The ARM client requires a subscriptionId.');
    }
    
    this.options = options;
  }
  
  buildRequest(method, path, query, accessToken) {
    if (!path || path.indexOf('https://') < 0) {
     path = `${this.options.managementEndpoint}/subscriptions/${this.options.subscriptionId}${path}`;
    }
    
    return request(method, path)
      .query(query || { })
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Accept', 'application/json');
  }
  
  handleResponse(resolve, reject) {
    return (err, res) => {
      if (err && res && !res.ok) {
        return reject({
          status: res.status,
          details: res.body || res.text
        });
      }
      else if (err) {
        return reject(err);
      }
      else {
        return resolve({ body: res.body, headers: res.header });
      }
    };
  }
  
  provider(resourceGroupName, providerName) {
    return {
      get: (path, query) => this.get(`/resourceGroups/${resourceGroupName}/providers/${providerName}${path}`, query),
      post: (path, query, payload) => this.post(`/resourceGroups/${resourceGroupName}/providers/${providerName}${path}`, query, payload),
      put: (path, query, payload) => this.put(`/resourceGroups/${resourceGroupName}/providers/${providerName}${path}`, query, payload),
      del: (path, query, payload) => this.del(`/resourceGroups/${resourceGroupName}/providers/${providerName}${path}`, query, payload)
    };
  }
  
  get(path, query) {
    return this.options.auth()
      .then((accessToken) => {
        return new Promise((resolve, reject) => {
          this.buildRequest('GET', path, query, accessToken)
            .end(this.handleResponse(resolve, reject));
        });
      });
  }
  
  post(path, query, payload) {
    return this.options.auth()
      .then((accessToken) => {
        return new Promise((resolve, reject) => {
          this.buildRequest('POST', path, query, accessToken)
            .send(payload || { })
            .end(this.handleResponse(resolve, reject));
        });
      });
  }
  
  put(path, query, payload) {
    return this.options.auth()
      .then((accessToken) => {
        return new Promise((resolve, reject) => {
          this.buildRequest('PUT', path, query, accessToken)
            .send(payload || { })
            .end(this.handleResponse(resolve, reject));
        });
      });
  }
  
  del(path, query, payload) {
    return this.options.auth()
      .then((accessToken) => {
        return new Promise((resolve, reject) => {
          this.buildRequest('DELETE', path, query, accessToken)
            .send(payload || { })
            .end(this.handleResponse(resolve, reject));
        });
      });
  }
}