var Sequelize = require('sequelize');

module.exports = function(dbConnection) {
	return dbConnection.define('session', {
		sid: {
			type: Sequelize.STRING,
			primaryKey: true
		},
		userId: Sequelize.STRING,
		expires: Sequelize.DATE,
		data: Sequelize.STRING(50000)
	});
};