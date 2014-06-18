# procur-core
###TO RUN LOCALLY:

####/config/local.js

```
var url = require('url');
 
 module.exports = {
 
   host: process.env.HOST || 'localhost',
   port: process.env.PORT || 1337,
 
   environment: process.env.NODE_ENV || 'development',
 
   adapters:{
     'default': 'mongo',
     mongo: {
       module: 'sails-mongo',
       url: 'mongodb://localhost:27017/procur-core',
       schema: true
     }
   }
 };
```

