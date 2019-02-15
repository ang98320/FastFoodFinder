var restaurants = require('../restaurants.json');

exports.restaurantsInfo = function(req, res) {
	res.json(restaurants);
}