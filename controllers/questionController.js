import models from '../models';
const {question} = models;
import requireLogin from '../middleware/authMiddleware';
import parser from '../config/parser';

export default app => {
	app.get('/question', requireLogin, (req, res) => {
		res.send('nothing here :)');
	});

	app.post('/question', requireLogin, parser.url, (req, res) => {
		question.create({
			text: req.body.text
		})
		.then(d => {
			res.redirect('/admin/question/edit/'+d.id);
		});
	});

	app.put('/question/:id', requireLogin, parser.url, (req, res) => {
		question.update({
			text: req.body.text
		}, {
			where: {
				id: req.params.id
			}
		})
		.then(d => {
			res.send(d);
		})
		.catch(e => {
			console.log(e);
		});
	});

	app.delete('/question/:id', requireLogin, parser.url, (req, res) => {
		console.log(req.params.id);
		question.destroy({where: {id: req.params.id}})
			.then(d => {
				res.send('');
			});
	});
};