var {choice, question} = require('../models');

module.exports = function(app) {
	app.get('/admin', function(req, res) {
		question.findAll()
		.then(function(questions) {
			res.render('admin/index', {
				questions: questions
			});
		});
	});

	app.get('/admin/question/edit/:id', function(req, res) {
		question.findById(req.params.id)
			.then(function(question) {
				res.render('admin/question/edit', {
					question: question
				});
			});
	});

	app.get('/admin/question/add', function(req, res) {
		res.render('admin/question/add');
	});

	app.get('admin/question/', function(req, res) {

	});

	app.get('admin/question/edit', function(req, res) {

	});
};