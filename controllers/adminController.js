var {choice, question, user} = require('../models');
var requireLogin = require('../middleware/authMiddleware');

module.exports = function(app) {

	app.post('/login', function(req, res) {

		user.findOne({ email: req.body.email })
		.then(function(user) {
			if (!user) {
				//flash message 'Invalid email or password.'
			} else {
				if (req.body.password === user.password) {
					req.session.admin = true;
					console.log(req.session);
					res.redirect('/admin');
				} else {
					res.redirect('/login');
				}
			}
		});
	});

	app.get('/login', function(req, res) {
		res.render('admin/login');
	});

	app.get('/logout', requireLogin, function(req, res) {
		//req.session.reset();
		req.session.admin = undefined;
		res.redirect('/');
	});

	app.get('/admin', requireLogin, function(req, res) {
		question.findAll()
		.then(function(questions) {
			res.render('admin/index', {
				questions: questions
			});
		})
		.catch((e) => {
			res.send('No questions found');
		});

	});

	app.get('/admin/question/edit/:id', requireLogin, function(req, res) {
		var foundQuestion,
			choices;

		question.findById(req.params.id)
			.then(function(q) {
				foundQuestion = q;
				return q;
			})
			.then(function(q) {
				return q.getChoices();
			})
			.then(function(choices) {
				res.render('admin/question/edit', {
					question: foundQuestion,
					choices: choices
				});
			})
			.catch((e) => {
				res.send('No question found');
			});


	});

	app.get('/admin/question/add', requireLogin, function(req, res) {
		res.render('admin/question/add');
	});
};