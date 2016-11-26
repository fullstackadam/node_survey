var Sequelize = require('sequelize');

module.exports = function(dbConnection) {
	return dbConnection.define('survey', {
		title: {
			type: Sequelize.STRING,
			notNull: true
		},
		description: {
			type: Sequelize.TEXT
		},
		/*user_id: {
			type: Sequelize.INTEGER,
			references: "User",
			referencesKey: "id"
		}*/
	});
};