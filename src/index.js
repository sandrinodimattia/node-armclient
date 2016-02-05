import ArmClient from './ArmClient';
import ArgumentError from './errors/ArgumentError';

import { tokenCredentials, clientCredentials } from './authentication';

module.exports = (options) => {
  if (!options || !(options instanceof Object)) {
    throw new ArgumentError('The options must be an object.');
  }
  
  if (!options.auth || !(options.auth instanceof Object)) {
    throw new ArgumentError('An authentication provider must be configured.');
  }
  
  return new ArmClient(options);
}

module.exports.tokenCredentials = tokenCredentials;
module.exports.clientCredentials = clientCredentials;