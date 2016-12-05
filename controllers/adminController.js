import {choice, question, user} from '../models';
import requireLogin from '../middleware/authMiddleware';

export default (app) => {

	app.post('/login', (req, res) => {

		user.findOne({ email: req.body.email })
		.then((user) => {
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

	app.get('/login', (req, res) => {
		res.render('admin/login');
	});

	app.get('/logout', requireLogin, (req, res) => {
		//req.session.reset();
		req.session.admin = undefined;
		res.redirect('/');
	});

	app.get('/admin', requireLogin, (req, res) => {
		question.findAll()
		.then((questions) => {
			res.render('admin/index', {
				questions: questions
			});
		})
		.catch((e) => {
			res.send('No questions found');
		});

	});

	app.get('/admin/question/edit/:id', requireLogin, (req, res) => {
		var foundQuestion,
			choices;

		question.findById(req.params.id)
			.then((q) => {
				foundQuestion = q;
				return q;
			})
			.then((q) => {
				return q.getChoices();
			})
			.then((choices) => {
				res.render('admin/question/edit', {
					question: foundQuestion,
					choices: choices
				});
			})
			.catch((e) => {
				res.send('No question found');
			});


	});

	app.get('/admin/question/add', requireLogin, (req, res) => {
		res.render('admin/question/add');
	});
};