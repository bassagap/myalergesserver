'use strict';

module.exports = function(app) {
	var user = require('../controllers/userController');

	// todoList Routes
	app.route('/user')
		.get(user.get_all_users)
		console.log("GET user! Wiiii");

	app.route('/register')
		.post(user.register_user);
		console.log("POST register user! Wiiii");

	app.route('/authenticate')
		.post(user.authenticate_user);
		console.log("POST authenticate user! Wiiii");
};
