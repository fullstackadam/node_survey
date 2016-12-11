import models from '../models';
const {choice} = models;
import requireLogin from '../middleware/authMiddleware';
import parser from '../config/parser';

export default app => {

	app.get('/choice', requireLogin, (req, res) => {

	});

  
	app.post('/choice', requireLogin, parser.json, (req, res) => {

		var addedChoices = {'choices': []};

		req.body.choices.forEach(choice_item => {

			var choice_obj = {
				question_id: choice_item.question_id,
				text: choice_item.text
			};

			// if not new choice add id to choice object

			if(choice_item.id !== 'new') {
				choice_obj.id = choice_item.id;
			}

			choice.upsert(choice_obj)
			.then(d => {
				console.log(d);
			});
		});
		
		res.send('');
	});

	app.put('/choice/:id', requireLogin, parser.json, (req, res) => {

	});

	app.delete('/choice/:id', requireLogin, parser.url, (req, res) => {
		choice.destroy({where: {id: req.params.id}})
			.then(d => {
				console.log(d);
			});
		res.send('');
	});
};