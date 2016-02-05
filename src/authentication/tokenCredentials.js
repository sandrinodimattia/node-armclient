import jwt from 'jsonwebtoken';
import adal from 'adal-node';
import moment from 'moment';
import Promise from 'bluebird';

import ArgumentError from '../errors/ArgumentError';
import { AUTHENTICATION_ENDPOINT, MANAGEMENT_ENDPOINT } from '../constants';

export default function tokenCredentials(options) {
  if (!options || !(options instanceof Object)) {
    throw new ArgumentError('The Token Credentials options must be an object.');
  }
  
  if (!options.accessToken || options.accessToken.length === 0) {
    throw new ArgumentError('Token Credentials authentication requires an accessToken.');
  }

  return () => {
    return new Promise((resolve, reject) => {
      resolve(options.accessToken);
    });
  };
}