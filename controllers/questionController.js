import {question} from '../models';
import requireLogin from '../middleware/authMiddleware';

export default (app) => {
	app.get('/question', requireLogin, (req, res) => {
		res.send('nothing here :)');
	});

	app.post('/question', requireLogin, (req, res) => {
		question.create({
			text: req.body.text
		})
		.then(() => {
			res.redirect('/admin');
		});
	});

	app.put('/question/:id', requireLogin, (req, res) => {
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

	app.delete('/question/:id', requireLogin, (req, res) => {
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