var Sequelize = require('sequelize'),
	dbConnection = require('../config/db'),
	User = require('./user'),
	Survey = require('./survey'),
	Question = require('./question'),
	Answer = require('./answer'),
	Session = require('./session');

/*sequelize.authenticate()
.then(function(err) {
	console.log('Connection has been established successfully.');
})
.catch(function (err) {
	console.log('Unable to connect to the database:', err);
});*/

var db = {};

db.user = User(dbConnection);

// seed user data

// force: true will drop the table if it already exists
db.user.sync({force: true}).then(function () {
  // Table created
  return db.user.create({
    name: 'Adam',
    email: 'a@b.com',
    password: '123'
  });
});

db.survey = Survey(dbConnection);

//User.belongsToMany(Survey, {through: UserSurveys});

//seed Survey

db.survey.sync({force: true}).then(function() {
	return db.survey.create({
		title: 'Sanity Check',
		description: 'Are you insane?',
		user_id: 1
	});
});

db.question = Question(dbConnection);

//Question.belongsTo(Survey);

db.question.sync({force: true}).then(function() {
	return db.question.create({
		text: 'This is not a question'
	});
});

db.answer = Answer(dbConnection);

//Answer.belongsTo(Question);

db.answer.sync({force: true}).then(function() {
	return db.answer.create({
		text: 'bad answer 1'
	});
});

db.session = Session(dbConnection);

db.session.sync({force: true}).then(function() {
	console.log('set up sessions table');
});

module.exports = db;

