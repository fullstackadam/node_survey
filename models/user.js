module.exports = function(dbConnection, Sequelize) {

	return dbConnection.define('user', {
		name: {
			type: Sequelize.STRING,
			notNull: true,
			notEmpty: true,
			isAlphanumeric: true
		},
		email: {
			type: Sequelize.STRING,
			notNull: true,
			notEmpty: true,
			isEmail: true
		},
		password: {
			type: Sequelize.STRING,
			notNull: true,
			notEmpty: true
		} // encrypted
	});
};