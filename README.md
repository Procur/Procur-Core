# Procur-Core
##Stack
```
|=======|    |=========|
| REDIS |    | MONGODB |
| -sess |    | -appdata|
|=======|    |=========|
    |             |
    |             |
    |  |-------|  |
    |--| SAILS |--|
       |-------|
          ^ |
          | V
       |-------|
       |  web  |
       |-------|
```
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
> use dbname
> db.databaseName.drop()
```
* Clearing a single collection  
`db.collectionName.drop()`

###Don't(s)
* DO NOT ALLOW YOUR LOCAL DB TO BE PUSHED TO THIS REPO
* DO NOT ALLOW `config/local.js` TO BE PUSHED TO THIS REPO

##Routes

###Marketing Pages
`/` - Displays front page  
`/features` - Features page  
`/pricing` - Pricing page  
`/about` - About page  
`/earlyaccess` - Early Access page  
`/faq` - FAQ page  
`/privacy` - Privacy Policy page  


###Action Views
####GET
`/login` - Login Page  
`/signup` - Registration page  
`/contact` - Contact page  
`/contact/subscribe` - Mailing list subscription action  

####POST
`/contact` - Submits contact message and sends email to Procur  

###Authentication Routes
####GET
`/logout` - Destroys the user session and redirects to `/goodbye`  
`/goodbye` - Logout Confirmation view  
`/pleaseverify` - View asking user to click the activation email before continuing to `/dashboard`  
`/verify` - Handles email activation link click and redirects to next step in wizard or to `/dashboard` if wizard is complete  
`/resendverification` - Handles user request to resend activation email  
`/forgotpassword` - Forgot password view  
`/resetpassword` - View for new password selection  
`/resetpassword/confirm` - Confirmation page for password reset request  

####POST
`/login` - Authenticates the user  
`/register` - Creates a user account  
`/user/changepassword` - Changes the password of the authenticated user  
`/forgotpassword` - Handles Email input for 'Forgot Password'  
`/resetpassword` - Processes password change  