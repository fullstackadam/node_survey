var Sequelize = require('sequelize');

module.exports = function(dbConnection) {

	return dbConnection.define('user', {
		name: {
			type: Sequelize.STRING,
			notNull: true,
			isAlphanumeric: true
		},
		email: {
			type: Sequelize.STRING,
			notNull: true,
			isEmail: true
		},
		password: {
			type: Sequelize.STRING,
			notNull: true
		} // encrypted
	});
};