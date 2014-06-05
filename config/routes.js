/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */



/**
 * (1) Core middleware
 *
 * Middleware included with `app.use` is run first, before the router
 */


/**
 * (2) Static routes
 *
 * This object routes static URLs to handler functions--
 * In most cases, these functions are actions inside of your controllers.
 * For convenience, you can also connect routes directly to views or external URLs.
 *
 */

module.exports.routes = {

  // By default, your root route (aka home page) points to a view
  // located at `views/home/index.ejs`
  //
  // (This would also work if you had a file at: `/views/home.ejs`)

  'get /stupidtest': {
    controller: 'CompanyController',
    action: 'testing'
  },


  //LANDING PAGE ROUTES
  'get /': {
    controller: 'HomeController',
    action: 'index'
  }, //Displays Front Page

  'get /features': {
    controller: 'HomeController',
    action: 'features'
  }, //Displays Features

  'get /pricing': {
    controller: 'HomeController',
    action: 'pricing'
  }, //Displays Pricing

  'get /tradeshows': {
    controller: 'HomeController',
    action: 'tradeShows'
  }, //Displays Trade Shows

  'get /about': {
    controller: 'HomeController',
    action: 'aboutUs'
  }, //Displays 'about us' View

  'get /press': {
    controller: 'HomeController',
    action: 'press'
  }, //Displays Press Page

  'get /careers': {
    controller: 'HomeController',
    action: 'careers'
  }, //Displays Careers Page

  'get /contact': {
    controller: 'HomeController',
    action: 'contact'
  }, //Displays Contact Form View

  'get /faq': {
    controller: 'HomeController',
    action: 'faq'
  }, //Displays FAQ Page

  'get /contactsupport': {
    controller: 'HomeController',
    action: 'contactSupport'
  }, //Displays Support Page

  'get /privacy': {
    controller: 'HomeController',
    action: 'privacyNotice'
  }, //Displays Privacy Notice Page

  'get /terms': {
    controller: 'HomeController',
    action: 'terms'
  }, //Displays Terms of Use Page

  //AUTHENTICATION ROUTES
  'post /login': {
    controller: 'AuthController',
    action: 'process'
  }, //Processes Login Request

  'post /register': {
    controller: 'AuthController',
    action: 'register'
  }, //Processes Registration Request

  'post /user/changepassword': {
    controller: 'AuthController',
    action: 'processChangePassword'
  },

  '/logout': {
    controller: 'AuthController',
    action: 'logout'
  }, //Processes Logout

  'get /goodbye': {
    controller: 'AuthController',
    action: 'goodbye'
  }, //Displays Logout Confirmation View

  'get /pleaseverify': {
    controller: 'UserController',
    action: 'pleaseVerify'
  },

  'get /verify': {
    controller: 'AuthController',
    action: 'verifyEmail'
  }, //HANDLES ACTIVATION EMAIL CLICK. RECEIVES ACTIVATION TOKEN

  'get /resendverification': {
    controller: 'AuthController',
    action: 'resendVerificationEmail'
  },

  'get /forgotpassword': {
    controller: 'AuthController',
    action: 'forgotPassword'
  },

  'post /forgotpassword': {
    controller: 'AuthController',
    action: 'processForgotPassword'
  },

  'get /resetPassword': {
    controller: 'AuthController',
    action: 'selectNewPassword'
  },

  'get /resetpassword/confirm': {
    controller: 'AuthController',
    action: 'resetRequestMade'
  },

  'post /resetpassword': {
    controller: 'AuthController',
    action: 'processSelectNewPassword'
  },

  //USER ROUTES

  'get /user/update': {
    controller: 'UserController',
    action: 'updateAccount'
  },

  'post /user/update': {
    controller: 'UserController',
    action: 'processUpdateAccount'
  },

  //WELCOME ROUTES
  'get /welcome': {
    controller: 'UserController',
    action: 'welcome'
  }, //Displays Company Creation Form

  'post /welcome': {
    controller: 'CompanyController',
    action: 'setup'
  }, //Processes submission of company creation form

  'get /welcome/moreinfo': {
    controller: 'CompanyController',
    action: 'buyerOrSupplier'
  }, //Displays buyer/supplier/both slection view

  'get /welcome/buyer': {
    controller: 'CompanyController',
    action: 'buyerWizard'
  }, //Displays buyer setup wizard

  'get /welcome/supplier': {
    controller: 'CompanyController',
    action: 'supplierWizard'
  }, //Displays supplier setup wizard

  'get /welcome/selectdefault': {
    controller: 'CompanyController',
    action: 'selectDefault'
  }, //Starts Buyer + Supplier setup process

  'get /welcome/both': {
    controller: 'CompanyController',
    action: 'setBoth'
  }, //Processes primaryMode selection

  'get /buyerdefault': {
    controller: 'CompanyController',
    action: 'setDefault'
  },

  'get /supplierdefault': {
    controller: 'CompanyController',
    action: 'setDefault'
  },

  // TODO: BUILD BOTH LOGIC ^^^^^^^^^^^^^^^^^^^^^^^^^^^

  'post /buyer/create': {
    controller: 'BuyerController',
    action: 'create'
  }, //Processes submission of Buyer Wizard

  'post /supplier/create': {
    controller: 'SupplierController',
    action: 'create'
  }, //Processes submission of SupplierWizard

  //DASHBOARD ROUTES
  'get /dashboard': {
    controller: 'DashboardController',
    action: 'index'
  }, //Displays MyProcur Dashboard

  //COMPANY ROUTES
  'get /companies/:id': {
    controller: 'CompanyController',
    action: 'show'
  },

  'post /company/create': {
    controller: 'CompanyController',
    action: 'create'
  }, //Processes submission of Company Wizard

  'get /company/selecthandle': {
    controller: 'CompanyController',
    action: 'selectHandle'
  },

  'post /company/createHandle': {
    controller: 'CompanyController',
    action: 'createHandle'
  },

  'get /company/changehandle': {
    controller: 'CompanyController',
    action: 'changeHandle'
  },

  'post /company/changehandle': {
    controller: 'CompanyController',
    action: 'updateHandle'
  },

  'get /company/update': {
    controller: 'CompanyController',
    action: 'update'
  },

  'post /company/update': {
    controller: 'CompanyController',
    action: 'setUpdate'
  },

  //ERROR ROUTES
  'get /error/notfound': {
    controller: 'CompanyController',
    action: 'notFound'
  },

  //TESTING ROUTES

  'get /internal': {
    controller: 'AuthController',
    action: 'test'
  } //USE THIS VIEW FOR TESTING, DEBUGGING, AND PROTOTYPING

  //DEPRECATED ROUTES

  /*'get /login': {
    controller: 'AuthController',
    action: 'login'
  },*/

  /*
  // But what if you want your home page to display
  // a signup form located at `views/user/signup.ejs`?
  '/': {
    view: 'user/signup'
  }


  // Let's say you're building an email client, like Gmail
  // You might want your home route to serve an interface using custom logic.
  // In this scenario, you have a custom controller `MessageController`
  // with an `inbox` action.
  '/': 'MessageController.inbox'


  // Alternatively, you can use the more verbose syntax:
  '/': {
    controller: 'MessageController',
    action: 'inbox'
  }


  // If you decided to call your action `index` instead of `inbox`,
  // since the `index` action is the default, you can shortcut even further to:
  '/': 'MessageController'


  // Up until now, we haven't specified a specific HTTP method/verb
  // The routes above will apply to ALL verbs!
  // If you want to set up a route only for one in particular
  // (GET, POST, PUT, DELETE, etc.), just specify the verb before the path.
  // For example, if you have a `UserController` with a `signup` action,
  // and somewhere else, you're serving a signup form looks like:
  //
  //		<form action="/signup">
  //			<input name="username" type="text"/>
  //			<input name="password" type="password"/>
  //			<input type="submit"/>
  //		</form>

  // You would want to define the following route to handle your form:
  'post /signup': 'UserController.signup'


  // What about the ever-popular "vanity URLs" aka URL slugs?
  // (you might remember doing this with `mod_rewrite` in Apache)
  //
  // This is where you want to set up root-relative dynamic routes like:
  // http://yourwebsite.com/twinkletoez
  //
  // NOTE:
  // You'll still want to allow requests through to the static assets,
  // so we need to set up this route to ignore URLs that have a trailing ".":
  // (e.g. your javascript, CSS, and image files)
  'get /*(^.*)': 'UserController.profile'

  */
};



/**
 * (3) Action blueprints
 * These routes can be disabled by setting (in `config/controllers.js`):
 * `module.exports.controllers.blueprints.actions = false`
 *
 * All of your controllers ' actions are automatically bound to a route.  For example:
 *   + If you have a controller, `FooController`:
 *     + its action `bar` is accessible at `/foo/bar`
 *     + its action `index` is accessible at `/foo/index`, and also `/foo`
 */


/**
 * (4) Shortcut CRUD blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *			`module.exports.controllers.blueprints.shortcuts = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *		/foo/find/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		/foo/create		->	create a lampshade using specified values
 *
 *		/foo/update/:id	->	update the lampshade with id=:id
 *
 *		/foo/destroy/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (5) REST blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *		`module.exports.controllers.blueprints.rest = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *
 *		get /foo/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		post /foo		-> create a lampshade using specified values
 *
 *		put /foo/:id	->	update the lampshade with id=:id
 *
 *		delete /foo/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (6) Static assets
 *
 * Flat files in your `assets` directory- (these are sometimes referred to as 'public')
 * If you have an image file at `/assets/images/foo.jpg`, it will be made available
 * automatically via the route:  `/images/foo.jpg`
 *
 */



/**
 * (7) 404 (not found) handler
 *
 * Finally, if nothing else matched, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 */
