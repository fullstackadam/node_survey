module.exports = function(dbConnection, Sequelize) {
	return dbConnection.define('question', {
		text: {
			type: Sequelize.STRING,
			notNull: true,
			notEmpty: true
		}
	});
};