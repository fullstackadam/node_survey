import models from '../models';
const {choice, question, user} = models;
import crypto from 'crypto';
import requireLogin from '../middleware/authMiddleware';
import parser from '../config/parser';

export default app => {

	app.post('/login', parser.url, (req, res) => {

		user.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				//flash message 'Invalid email or password.'
			} else {
				const hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64).toString('hex');
				if (hash === user.hash) {
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
		const title = 'Login'

		res.render('admin/login', {
			title: title
		});
	});

	app.get('/logout', requireLogin, (req, res) => {
		req.session.admin = undefined;
		res.redirect('/');
	});

	app.get('/admin', requireLogin, (req, res) => {
		const title = 'Questions';

		question.findAll()
		.then(questions => {
			res.render('admin/index', {
				title: title,
				questions: questions
			});
		})
		.catch(e => {
			res.send('No questions found');
		});

	});

	app.get('/admin/question/edit/:id', requireLogin, parser.url, (req, res) => {
		var foundQuestion,
			choices;

		const title = 'Edit Question';

		question.findById(req.params.id)
			.then(q => {
				foundQuestion = q;
				return q;
			})
			.then(q => {
				return q.getChoices();
			})
			.then(choices => {
				res.render('admin/question/edit', {
					title: title,
					question: foundQuestion,
					choices: choices
				});
			})
			.catch(e => {
				res.send('No question found');
			});


	});

	app.get('/admin/question/add', requireLogin, (req, res) => {
		const title = 'Add Question';

		res.render('admin/question/add', {
			title: title
		});
	});
};