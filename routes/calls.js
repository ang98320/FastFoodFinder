var restaurants = require('../response.json');

exports.info = function(req, res) {
	res.json(restaurants);
}