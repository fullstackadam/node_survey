import {choice} from '../models';
import requireLogin from '../middleware/authMiddleware';

export default (app) => {

	//answer
	app.get('/choice', requireLogin, (req, res) => {

	});

  
	app.post('/choice', requireLogin, (req, res) => {
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

	app.put('/choice', requireLogin, (req, res) => {

	});

	app.delete('/choice', requireLogin, (req, res) => {

	});
};