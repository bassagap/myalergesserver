'use strict';

module.exports = function(app) {
	var food = require('../controllers/foodController');

	// todoList Routes
	app.route('/food')
		.get(food.get_all_ingredients)
		console.log("GET Routes");
};
