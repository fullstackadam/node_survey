import db from '../config/db';
import models from '../models';
const {question, answer, session} = models;
import shuffle from 'shuffle-array';
import parser from '../config/parser';

export default app => {
  app.get('/', (req, res) => {

  	//find unanswered questions

	const q = 'select *,questions.id from questions ' +
		'left join answers ' +
		'on questions.id = answers.question_id ' +
		'where question_id IS NULL';

    db.query(q)
		.then(questions => {
			console.log(questions);
			var availableQuestions = [];
			
			// put question ids into array
			questions[0].forEach(question_item => {
				availableQuestions.push(question_item.id);
			});
			console.log(availableQuestions);
			// put question id's into array
			if(availableQuestions.length === 0) {
				throw new Error('Out of questions');
			}

			// shuffle array
			shuffle(availableQuestions);
	    	
	    	const id = availableQuestions.pop();

	    	return question.findById(id);
		})
    	.then(question => {
    		console.log(question);
    		return question.getChoices()
				.then(choices => {
					return {question: question, choices: choices};
				});
		})    			
		.then(d => {
			const title = 'Random Question';

			res.render('guest/index', { 
				title: title,
				question: d.question,
				choices: d.choices
			});
		})
		.catch(e => {
			const title = 'Out of Questions';

			res.render('guest/outOfQuestions', {
				title: title
			});
		});
    
  });

  app.post('/answer_question', parser.url, (req, res) => {
  		const question_id = req.param('question'),
  			answer_id = req.param('answer'),
  			session_id = req.session.id;

  		// save answer if not already answered
		answer.findOrCreate({
			where: {
				session_id: session_id,
				question_id: question_id
			},
			defaults: {
				choice_id: answer_id
			}
		})
		.then(() => {
			res.redirect('/');
		})
		.catch(e => {
			console.log(e);
			res.send(e.message);
		});
  });

};