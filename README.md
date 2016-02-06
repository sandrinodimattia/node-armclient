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
import ArmClient, { clientCredentials } from 'armclient';

const client = ArmClient({ 
  subscriptionId: '111111-2222-3333333',
  auth: clientCredentials({
    tenantId: '444444-555555-666666666',
    clientId: '777777-888888-999999999',
    clientSecret: 'aaaabbbbbccccc' // or servicePrincipalPassword
  })
});
```

If you already have a token for the API (eg: through an OAuth2 consent flow), you can also initialize the client with that token:


```js
import ArmClient, { tokenCredentials } from 'armclient';

const client = ArmClient({ 
  subscriptionId: '111111-2222-3333333',
  auth: ArmClient.tokenCredentials({
    accessToken: 'abcdefg'
  })
});
```

### GET

An example of how you can get resources in your subscription and how you can specify the querystring:

```js
client.get('/resourceGroups/lab/providers/Microsoft.Automation/automationAccounts', { 'api-version': '2015-10-31' })
  .then((res) => {
    console.log(res.body);
    console.log(res.headers);
  })
  .catch((err) => {
    console.log(err);
  });
```

Or you can also specify the full path:

```js
client.get('https://management.azure.com/subscriptions/111-222-333-444/resourceGroups/lab/providers/Microsoft.Automation/automationAccounts', { 'api-version': '2015-10-31' })
  .then((res) => {
    console.log(res.body);
    console.log(res.headers);
  })
  .catch((err) => {
    console.log(err);
  });
```

### POST/PUT/DELETE

For `POST`/`PUT`/`DELETE` the syntax is the same but you also specify the body of the request (the payload you want to send to the API):

```js
const payload = {
  name: 'abc',
  storageAccount: 'def' 
};

client.post('/resourceGroups/lab/providers/Something/register', { 'api-version': '2015-10-31' }, payload)
  .then((res) => {
    console.log(res.body);
    console.log(res.headers);
  })
  .catch((err) => {
    console.log(err);
  });

client.put('/resourceGroups/lab/providers/Something/register', { 'api-version': '2015-10-31' }, payload)
  .then((res) => {
    console.log(res.body);
    console.log(res.headers);
  })
  .catch((err) => {
    console.log(err);
  });

client.del('/resourceGroups/lab/providers/Something/register', { 'api-version': '2015-10-31' }, payload)
  .then((res) => {
    console.log(res.body);
    console.log(res.headers);
  })
  .catch((err) => {
    console.log(err);
  });
```

### Provider

You can also create a client which is scoped to a `Resource Group` and a `Resource Provider`, eg:

```js
client.provider('my-resource-group', 'Microsoft.Compute')
  .put('/virtualMachines/myvm1', { 'api-version': '2015-01-01' }, payload)
  .then((res) => {
    console.log(res.body);
    console.log(res.headers);
  });
```