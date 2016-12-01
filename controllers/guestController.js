var db = require('../config/db'),
	{question, answer, session} = require('../models'),
	shuffle = require('shuffle-array');

module.exports = function(app) {
  app.get('/', function(req, res) {

    //get count
    
    question.count()
	    .then(function(c) {
			// find ids of questions not answered
			// where question.id = answer.question_id

			/*
				select * from questions 
				left join answers 
				on questions.id = answers.question_id 
				where question_id IS NULL;
			*/

			var q = 'select *,questions.id from questions \
				left join answers \
				on questions.id = answers.question_id \
				where question_id IS NULL';

			return db.query(q);
	    })
		.then(function(answers) {
			var availableQuestions = [];
			
			answers[0].forEach(function(answer) {
				availableQuestions.push(answer.id);
			});


			if(availableQuestions.length === 0) {
				throw new Error('Out of questions');
			}
			
			// shuffle array
			shuffle(availableQuestions);
	    	
	    	var id = availableQuestions.pop();

	    	return question.findById(id);
		})
    	.then(function(question) {
    		return question.getChoices()
    			.then(choices => {
    				//console.log(choices);
    				return {question: question, choices: choices};
    			});
		})
		.then(function(data) {
			//console.log(data);
			res.render('guest/index', { 
				question: data.question,
				choices: data.choices
			});
		})
		.catch(e => {
			console.log(e.message);
			res.render('guest/outOfQuestions');
		});
    
  });

  app.post('/answer_question', function(req, res) {
  		var question_id = req.param('question'),
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
		.then(function() {
			res.redirect('/');
		})
		.catch(e => {
			console.log(e);
			res.send(e.message);
		});

		session.findOne({where: {sid: session_id}})
			.then(function(session) {
				return session.getAnswers();
			})					
			.then(function(answers){
				answers.forEach(function(answer) {
					console.log(answer.getChoice().then().done());
				});
			});

		
  });

};