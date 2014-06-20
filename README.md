# Procur-Core
##Running Locally  

###Development Environment Setup
* Install Homebrew:  
`ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"`  
* Install MongoDB:  
`brew install mongodb`  
* Ensure that mongoDB is running:  
`brew services start mongodb`  
* Install Redis:  
`brew install redis`  
* Ensure that Redis is running:  
`brew services start redis`
* Clone the Repository:  
`git clone git@github.com:Procur/Procur-Core.git && cd Procur-Core/`  
* Create a local MongoDB folder:  
`mkdir db/`  
* Start MongoDB:  
`mongod --dbpath db/`  
* Create `Procur-Core/config/local.js` and populate it with the following data:
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
         host: 'localhost',
         port: 27017,
         schema: true
       }
     }
 };
```

###Using Redis
Procur-Core uses Redis as its session store. In development mode, it looks for a local instance of Redis on its default port of `6379`.  
* Redis Command Line Interface  
`redis-cli`  
* Show all sessions in redis-cli:  
`> KEYS *`  
* Show the contents of a key:  
`> GET [key]`  
* Delete a key:  
`> DEL [key]`

###Common Problems
####Failed to Deserialze User
If a user document is removed from mongoDB before that user has been logged out, an error will be thrown on the next request to the server that contains `failed to deserialize user`. If you know the user's session id, you can delete its respective session key from redis to remedy the problem by using the delete method mentioned above.

####I want to completely clear Redis and just start over!
Simply running `FLUSHALL` in the Redis-CLI will remove all keys and return a blank slate for you to break again.

####My local database contains too much stuff! Halp!
If the amount of data in your local MongoDB instance becomes to great to comfortably use for development, or if too many malformed documents have been created from development and testing, and you wish to scorch the Earth, simply follow these steps:  
* Clearing the entire DB  
```
> use db
> db.collection.drop()
```
* Clearing a single collection  
`db.collection.drop()`
