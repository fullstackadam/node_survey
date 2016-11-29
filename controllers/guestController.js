var db = require('../models');

module.exports = function(app) {
  app.get('/', function(req, res) {
    
    //avoid already answered questions
    var answers = [
    	'one',
    	'two',
    	'forty',
    	'fifty-five',
    	'I can\'t count'
    ];



    //get random survey question

    //get count
    
    var c = db.question.count().then(function(c) {
    	return c;
    }).then(function(c) {
    	console.log('There are '+c+' questions');
    	return c;
    }).then(function(c) {
    	
    	//id = rand 1 -> count
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
};