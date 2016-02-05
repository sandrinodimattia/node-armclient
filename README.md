# node-armclient

`node-armclient` is a very simple client to interact with the Azure Resource Manager API.

> npm install --save armclient

## Usage

### Initialization

ES5:

```js
var ArmClient = require('armclient');

var client = ArmClient({ 
  subscriptionId: '111111-2222-3333333',
  auth: ArmClient.clientCredentials({
    tenantId: '444444-555555-666666666',
    clientId: '777777-888888-999999999',
    clientSecret: 'aaaabbbbbccccc' // or servicePrincipalPassword
  })
});
```

ES6:

```js
import ArmClient, { ClientCredentials } from 'armclient';

const client = ArmClient({ 
  subscriptionId: '111111-2222-3333333',
  auth: ArmClient.clientCredentials({
    tenantId: '444444-555555-666666666',
    clientId: '777777-888888-999999999',
    clientSecret: 'aaaabbbbbccccc' // or servicePrincipalPassword
  })
});
```
### Queries

Get all resources in my subscription:

```js
client.getResources({ 'api-version': '2015-01-01' })
  .then((res) => {
    console.log(res.body);
    console.log(res.header);
  })
  .catch((err) => {
    console.log(err);
  });
```

Get all resources in a specific path (eg: all `automationAccounts`):

```js
client.get('lab', '/providers/Microsoft.Automation/automationAccounts', { 'api-version': '2015-10-31' })
  .then((res) => {
    console.log(res.body);
    console.log(res.header);
  })
  .catch((err) => {
    console.log(err);
  });
```