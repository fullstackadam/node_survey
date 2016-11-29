module.exports = function(dbConnection, Sequelize) {

	return dbConnection.define('answer', {
		question_id: {
			type: Sequelize.INTEGER,
			notNull: true,
			notEmpty: true
		},
		text: {
			type: Sequelize.STRING,
			notNull: true,
			notEmpty: true
		}
	});

};