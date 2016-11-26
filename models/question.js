var Sequelize = require('sequelize');

module.exports = function(dbConnection) {
	return dbConnection.define('question', {
		text: {
			type: Sequelize.STRING,
			notNull: true
		}
	});
};