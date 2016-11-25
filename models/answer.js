var Sequelize = require('sequelize');
var Question = require('./question');

module.exports = function(sequelize) {
	var Answer = sequelize.define('answer', {
	  text: {
	  	type: Sequelize.STRING,
	  	notNull: true
	  },
	});

	//Answer.belongsTo(Question);

	Answer.sync({force: true}).then(function() {
		return Answer.create({
			text: 'bad answer 1'
		});
	});
};