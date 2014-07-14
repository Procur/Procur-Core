/**
 * Policy mappings (ACL)
 *
 * Policies are simply Express middleware functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect just one of its actions.
 *
 * Any policy file (e.g. `authenticated.js`) can be dropped into the `/policies` folder,
 * at which point it can be accessed below by its filename, minus the extension, (e.g. `authenticated`)
 *
 * For more information on policies, check out:
 * http://sailsjs.org/#documentation
 */


module.exports.policies = {

  // Default policy for all controllers and actions
  // (`true` allows public access)
  '*': true,

  AuthController: {
    verifyEmail: [],
    process: ['isNotAuthenticated'],
    register: ['isNotAuthenticated'],
    processChangePassword: ['isAuthenticated'],
    logout: ['isAuthenticated'],
    pleaseVerify: ['isAuthenticated'],
    forgotPassword: ['isNotAuthenticated'],
    selectNewPassword: ['isNotAuthenticated'],
    resetRequestMade: ['isNotAuthenticated'],
    processSelectNewPassword: ['isNotAuthenticated'],
    passwordResetSuccess: ['isNotAuthenticated']
  },

  DashboardController: {
    index: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isVerified', 'hasHandle']
  },

  UserController: {
    welcome: ['sessionCheck', 'isAuthenticated'],
    pleaseVerify: ['sessionCheck', 'isAuthenticated', 'wizardComplete'],
    updateAccount: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete'],
    processUpdateAccount: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete'],
    toggleMode: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isBuyerAndSupplier']
  },

  HomeController: {
    signup: ['isNotAuthenticated'],
    login: ['isNotAuthenticated']
  },

  CompanyController: {
    create: ['sessionCheck', 'isAuthenticated', 'hasCompanyDenyAction'],
    buyerOrSupplier: ['sessionCheck', 'isAuthenticated', 'profileComplete'],
    createBuyer: ['sessionCheck', 'isAuthenticated', 'profileComplete'],
    createSupplier: ['sessionCheck', 'isAuthenticated', 'profileComplete'],
    createBuyerAndSupplier: ['sessionCheck', 'isAuthenticated'],
    update: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete'],
    setUpdate: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete'],
    selectDefault: ['sessionCheck', 'isAuthenticated', 'profileComplete'],
    setDefault: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'isBuyerAndSupplier'],
    setBoth: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'goBackToWizard'],
    supplierWizard: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'goBackToWizard', 'setSupplierTrueFalse'],
    buyerWizard: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'goBackToWizard', 'setBuyerTrueFalse']
  },

  BuyerController: {
    index: ['sessionCheck', 'isAuthenticated', 'profileComplete'],
    create: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'isBuyer'],
    update: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isBuyer'],
    destroy: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'denyAllAccess'],
    updateLogo: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete'],
    updateInformation: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isBuyer'],
    updateDescriptions: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isBuyer'],
    updatePreferences: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isBuyer'],
    updateSocialOutlets: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isBuyer']
  },

  SupplierController: {
    index: ['sessionCheck', 'isAuthenticated', 'profileComplete'],
    create: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'isSupplier'],
    update: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isSupplier'],
    destroy: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'denyAllAccess'],
    updateLogo: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isSupplier'],
    updateInformation: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isSupplier'],
    updateDescriptions: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isSupplier'],
    updatePreferences: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isSupplier'],
    updateSocialOutlets: ['sessionCheck', 'isAuthenticated', 'profileComplete', 'wizardComplete', 'isSupplier']
  }

  /*
	// Here's an example of adding some policies to a controller
	RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		'*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		feed : ['isNiceToAnimals', 'hasRabbitFood']
	}
	*/
};


/**
 * Here's what the `isNiceToAnimals` policy from above might look like:
 * (this file would be located at `policies/isNiceToAnimals.js`)
 *
 * We'll make some educated guesses about whether our system will
 * consider this user someone who is nice to animals.
 *
 * Besides protecting rabbits (while a noble cause, no doubt),
 * here are a few other example use cases for policies:
 *
 *	+ cookie-based authentication
 *	+ role-based access control
 *	+ limiting file uploads based on MB quotas
 *	+ OAuth
 *	+ BasicAuth
 *	+ or any other kind of authentication scheme you can imagine
 *
 */

/*
module.exports = function isNiceToAnimals (req, res, next) {

	// `req.session` contains a set of data specific to the user making this request.
	// It's kind of like our app's "memory" of the current user.

	// If our user has a history of animal cruelty, not only will we
	// prevent her from going even one step further (`return`),
	// we'll go ahead and redirect her to PETA (`res.redirect`).
	if ( req.session.user.hasHistoryOfAnimalCruelty ) {
		return res.redirect('http://PETA.org');
	}

	// If the user has been seen frowning at puppies, we have to assume that
	// they might end up being mean to them, so we'll
	if ( req.session.user.frownsAtPuppies ) {
		return res.redirect('http://www.dailypuppy.com/');
	}

	// Finally, if the user has a clean record, we'll call the `next()` function
	// to let them through to the next policy or our controller
	next();
};
*/
