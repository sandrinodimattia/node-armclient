import jwt from 'jsonwebtoken';
import adal from 'adal-node';
import moment from 'moment';
import Promise from 'bluebird';

import ArgumentError from '../errors/ArgumentError';
import { AUTHENTICATION_ENDPOINT, MANAGEMENT_ENDPOINT } from '../constants';

export default function clientCredentials(options) {
  if (!options || !(options instanceof Object)) {
    throw new ArgumentError('The Client Credentials options must be an object.');
  }
  
  options.managementEndpoint = options.managementEndpoint || MANAGEMENT_ENDPOINT;
  if (!options.managementEndpoint || options.managementEndpoint.length === 0) {
    throw new ArgumentError('Client Credentials authentication requires a managementEndpoint.');
  }
  
  options.authenticationEndpoint = options.authenticationEndpoint || AUTHENTICATION_ENDPOINT;
  if (!options.authenticationEndpoint || options.authenticationEndpoint.length === 0) {
    throw new ArgumentError('Client Credentials authentication requires an authenticationEndpoint.');
  }
  
  if (!options.tenantId || options.tenantId.length === 0) {
    throw new ArgumentError('Client Credentials authentication requires a tenantId.');
  }
  
  if (!options.clientId || options.clientId.length === 0) {
    throw new ArgumentError('Client Credentials authentication requires a clientId.');
  }
  
  if ((!options.clientSecret || options.clientSecret.length === 0)
      && (!options.servicePrincipalPassword || options.servicePrincipalPassword.length === 0)) {
    throw new ArgumentError('Client Credentials authentication requires a clientSecret or servicePrincipalPassword.');
  }
  
  let expiresIn = 60;
  let accessToken = null;
  let accessTokenIssued = null;

  return () => {
    return new Promise((resolve, reject) => {
      if (accessTokenIssued) {
        const timeAgo = moment(new Date()).diff(accessTokenIssued, 'minutes');
        if (timeAgo < (expiresIn - 10)) {
          return resolve(accessToken);
        }
      }
      
      const context = new adal.AuthenticationContext(`${options.authenticationEndpoint}/${options.tenantId}`);
      context.acquireTokenWithClientCredentials(`${options.managementEndpoint}/`, options.clientId, options.servicePrincipalPassword, (err, res) => {
        if (err) {
          return reject(err);
        }
        
        accessToken = res.accessToken;
        accessTokenIssued = new Date();
        
        // Calculate expiration.
        const accessTokenContents = jwt.decode(res.accessToken);
        expiresIn = Math.round(moment.duration(
          moment(new Date(accessTokenContents.exp * 1000))
            .diff(moment(new Date(accessTokenContents.iat * 1000)))).asMinutes())
      
        return resolve(accessToken);
      });
    });
  };
}