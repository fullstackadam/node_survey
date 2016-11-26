var Sequelize = require('sequelize'),
	dbConnection = require('../config/db'),
	User = require('./user'),
	Survey = require('./survey'),
	Question = require('./question'),
	Answer = require('./answer');

/*sequelize.authenticate()
.then(function(err) {
	console.log('Connection has been established successfully.');
})
.catch(function (err) {
	console.log('Unable to connect to the database:', err);
});*/

User = User(dbConnection);

// seed user data

// force: true will drop the table if it already exists
User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    name: 'Adam',
    email: 'a@b.com',
    password: '123'
  });
});

Survey = Survey(dbConnection);

//User.belongsToMany(Survey, {through: UserSurveys});

//seed Survey

Survey.sync({force: true}).then(function() {
	return Survey.create({
		title: 'Sanity Check',
		description: 'Are you insane?',
		user_id: 1
	});
});

Question = Question(dbConnection);

//Question.belongsTo(Survey);

Question.sync({force: true}).then(function() {
	return Question.create({
		text: 'This is not a question'
	});
});

Answer = Answer(dbConnection);

//Answer.belongsTo(Question);

Answer.sync({force: true}).then(function() {
	return Answer.create({
		text: 'bad answer 1'
	});
});

