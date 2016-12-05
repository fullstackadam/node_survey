var {choice} = require('../models'),
	requireLogin = require('../middleware/authMiddleware');

module.exports = function(app) {

	//answer
	app.get('/choice', requireLogin, function(req, res) {

	});

  
	app.post('/choice', requireLogin, function(req, res) {
		console.log(req.body);

		/*req.body.choices.forEach(function(thing) {
			console.log(thing);
		});*/

		res.send('');

		/*choice.create({
			text: req.body.text
		})
		.then(() => {
			res.redirect('/admin');
		});*/
	});

	app.put('/choice', requireLogin, function(req, res) {

	});

	app.delete('/choice', requireLogin, function(req, res) {

	});
};