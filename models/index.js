var Sequelize = require('sequelize'),
	dbConnection = require('../config/db'),
	seedData = require('./seedData'),
	foreignKeyConstraints = true;

// models

var user = dbConnection.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			isAlphanumeric: true
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			isEmail: true
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	} // encrypted
});

var question = dbConnection.define('question', {
	text: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
});

var choice = dbConnection.define('choice', {
	question_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	text: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
});

var answer = dbConnection.define('answer', {
	session_id: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	question_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	choice_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
});

var session = dbConnection.define('session', {
	sid: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	userId: Sequelize.STRING,
	expires: Sequelize.DATE,
	data: Sequelize.STRING(50000)
});

// associations

question.hasMany(choice, {
	as: 'Choices',
	foreignKey: 'question_id',
	constraints: foreignKeyConstraints
});

choice.belongsTo(question, {
	foreignKey: 'question_id',
	constraints: foreignKeyConstraints
});

question.hasMany(choice, {
	as: 'Choices',
	foreignKey: 'question_id',
	constraints: foreignKeyConstraints
});

choice.belongsTo(question, {
	foreignKey: 'question_id',
	constraints: foreignKeyConstraints
});

session.hasMany(answer, {
	as: 'Answers',
	foreignKey: 'session_id', 
	targetkey: 'sid',
	constraints: foreignKeyConstraints
});

answer.belongsTo(session, {
	foreignKey: 'session_id', 
	targetkey: 'sid',
	constraints: foreignKeyConstraints
});

answer.hasOne(choice, {
	as: 'Choice',
	foreignKey: 'choice_id',
	constraints: foreignKeyConstraints
});

choice.belongsTo(answer, {
	foreignKey: 'choice_id',
	constraints: foreignKeyConstraints
});

var models = {
	user: user,
	question: question,
	choice: choice,
	answer: answer,
	session: session
};

// set up tables and seed data

dbConnection.authenticate()
	.then(function() {
		return dbConnection.sync({force: true, logging: console.log});
	})
	.then(() => {
		seedData(module.exports);
	})
	.catch(e => {
		console.log(e);
		console.log('dbConnection failed');
	});

module.exports = models;