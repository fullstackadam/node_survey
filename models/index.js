var Sequelize = require('sequelize'),
	dbConnection = require('../config/db'),
	User = require('./user'),
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

db.question = Question(dbConnection);

db.question.sync({force: true}).then(function() {
	return db.question.create({
		text: 'This is not a question'
	});
});

//Who's the CEO of sumome
//What industry is sumo me in
//What's sumo me's score on glass door
//What company did Noah Kagan join after leaving facebook?
//What's the name of Noah kagan's $1000 per month entrepreneur course?
//what's sumome's value proposition?

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

