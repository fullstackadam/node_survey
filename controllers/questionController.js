var {question} = require('../models');

module.exports = function(app) {
	app.post('/question', function(req, res) {
		question.create({
			text: req.body.text
		})
		.then(() => {
			res.redirect('/admin');
		});
	});

	app.put('/question/:id', function(req, res) {
		question.update({
			text: req.body.text
		}, {
			where: {
				id: req.params.id
			}
		})
		.then(() => {
			res.redirect('/admin');
		})
		.catch((e) => {
			console.log(e);
		});
	});

	app.delete('/question/:id', function(req, res) {
		question.destroy({where: {id: req.params.id}});
		res.send('');
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