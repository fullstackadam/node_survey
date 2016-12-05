var {question} = require('../models'),
	requireLogin = require('../middleware/authMiddleware');

module.exports = function(app) {
	app.get('/question', requireLogin, function(req, res) {
		res.send('nothing here :)');
	});

	app.post('/question', requireLogin, function(req, res) {
		question.create({
			text: req.body.text
		})
		.then(() => {
			res.redirect('/admin');
		});
	});

	app.put('/question/:id', requireLogin, function(req, res) {
		question.update({
			text: req.body.text
		}, {
			where: {
				id: req.params.id
			}
		})
		.then((d) => {
			res.send(d);
		})
		.catch((e) => {
			console.log(e);
		});
	});

	app.delete('/question/:id', requireLogin, function(req, res) {
		var d = question.destroy({where: {id: req.params.id}})
			.return(d);
		
		res.send(d);
	});

	/*app.route('/question')
		.get('/:id', function(req, res) {
			question.findById(req.params.id)
				.then(function(question) {
					res.send(question);
				});
		})
		.post(function(req, res) {
			//create
		})
		.put('/:id', function(req, res) {
			//update
		})
		.delete('/:id', function(req, res) {
			question.destroy({where: {id: req.params.id}});
		})*/
};