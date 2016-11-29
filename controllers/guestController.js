var db = require('../models');

module.exports = function(app) {
  app.get('/', function(req, res) {
    
    console.log(req.session.id);

    //get count
    
    var c = db.question.count().then(function(c) {
    	return c;
    }).then(function(c) {
    	console.log('There are '+c+' questions');
    	return c;
    }).then(function(c) {
    	//get random survey question
		
		//avoid already answered questions
		
		//aq_arr query answered_question

		//while rand id in answered questions
    	id = Math.floor(Math.random() * (c - 1 + 1)) + 1;
    	
    	return id;
    }).then(function(id) {
    	
    	console.log(id);

    	db.question.findById(id)
	    	.then(function(question) {
		    	var answers = question.getAnswers();
		    	answers.then(function(answers) {
					res.render('guest/index', { 
						question: question,
						answers: answers
					});
		    	});
	    	});

    });
    
  });

  app.post('/answer_question', function(req, res) {
  		var question_id = req.param('question'),
  			answer_id = req.param('answer'),
  			session_id = req.session.id;

  		// save answer if not already answered
		db.answered_question.findOrCreate({
			where: {
				session_id: session_id,
				question_id: question_id
			},
			defaults: {
				answer_id: answer_id
			}
		});
		res.redirect('/');
  });

};