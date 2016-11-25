var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	var Survey = sequelize.define('survey', {
	  title: Sequelize.STRING, //required
	  description: Sequelize.TEXT
	});

	//seed Survey

	Survey.sync({force: true}).then(function() {
		return Survey.create({
			title: 'Sanity Check',
			description: 'Are you insane?'
		});
	});
};