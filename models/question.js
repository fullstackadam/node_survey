var Sequelize = require('sequelize');
var Survey = require('./survey');

module.exports = function(sequelize) {
	var Question = sequelize.define('question', {
	  text: Sequelize.STRING, //required
	});

	//Question.belongsTo(Survey);

	Question.sync({force: true}).then(function() {
		return Question.create({
			text: 'This is not a question'
		});
	});

};