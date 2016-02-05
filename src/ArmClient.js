
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
  
  _getPath(path, query) {
    return this.options.auth()
      .then((accessToken) => {
        return new Promise((resolve, reject) => {
          request
            .get(`${this.options.managementEndpoint}/subscriptions/${this.options.subscriptionId}${path}`)
            .query(query || { })
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
              if (err && !res.ok) {
                return reject({
                  status: res.status,
                  details: res.body || res.text
                });
              }
              else if (err) {
                return reject(err);
              }
              else {
                return resolve({ body: res.body, header: res.header });
              }
            });
        });
      });
  }
  
  getResources(query) {
    return this._getPath('/resources', query);
  }
  
  get(resourceGroup, path, query) {
    return this._getPath(`/resourceGroups/${resourceGroup}${path}`, query);
  }
}