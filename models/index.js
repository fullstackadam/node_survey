var Sequelize = require('sequelize'),
	dbConnection = require('../config/db');

var models = [
	'user',
	'question',
	'answer',
	//'session',
	'answered_question'
];

models.forEach(function(model) {
	module.exports[model] = dbConnection.import(__dirname + '/' + model);
});

dbConnection.query('SET FOREIGN_KEY_CHECKS = 0')
	.then(function() {
		dbConnection.sync({force: true, logging: console.log}).then(function() {
			(function(m) {
				m.question.hasMany(m.answer, {as: 'Answers', foreignKey: 'question_id'});
				//m.session.hasMany(m.answered_question, {as: 'Answers', foreignKey: 'session_id'});
			})(module.exports);
			seedData(module.exports);
		});
	})
	.catch(function(error) {
		console.log(error);
	});


	/*.then(function() {
		//seedData(module.exports);
	})
	.then(function() {
		module.exports.question.findOne()
			.then(function(question) {
				//question.getAnswers().then(function(answers) {
					//console.log(answers);
					//answers.forEach(function(answer) {
					//	console.log(answer.text);
					//});
				//});
				//var answer = module.exports.answer.build({text:'addAnswer 22 created'}).save();

				//console.log(answer);
				//question.setAnswers(answer);
				//question.save();
			});
	});*/

// seed user data

var seedData = function(m) {
	m.user.create({
		name: 'Adam',
		email: 'a@b.com',
		password: '123'
	});

	m.question.bulkCreate([/*{
		text: 'Who\'s the CEO of SumoMe?'
	}, {
		text: 'What industry is SumoMe in?'
	}, {
		text: 'What\'s SumoMe\'s score on Glassdoor?'
	}, {
		text: 'What company did Noah Kagan join after leaving facebook?'
	}, {
		text: 'What\'s the name of Noah Kagan\'s $1000 per month entrepreneur course?'
	}, {
		text: 'What\'s SumoMe\'s value proposition?'
	}, */{
		text: 'How do you feel about the election outcome?'
	}, {
		text: 'How do you feel about growth hacking?'
	}]);

	m.answer.bulkCreate([/*{
		question_id: 1,
		text: 'Mark Zuckerberg'
	}, {
		question_id: 1,
		text: 'Bill Gates'
	}, {
		question_id: 1,

	}*/{
		question_id: 1,
		text: 'I\'m ready for America to be great again'
	}, {
		question_id: 1,
		text: 'Can\'t wait for Obamacare to disappear'
	}, {
		question_id: 1,
		text: 'Meh, I didn\'t vote'
	}, {
		question_id: 1,
		text: 'I\'m ready to leave the country'
	}, {
		question_id: 1,
		text: 'I\'m ready to leave the planet'
	}, {
		question_id: 2,
		text: 'It\'s awesome. Can\'t wait to get rich'
	}, {
		question_id: 2,
		text: 'Meh. It\'s nothing new'
	}, {
		question_id: 2,
		text: 'Bah. It\'s modern snakeoil.'
	}]);
};

