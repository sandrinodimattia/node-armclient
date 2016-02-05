import Promise from 'bluebird';
import ArgumentError from '../errors/ArgumentError';

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