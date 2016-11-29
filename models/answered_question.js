module.exports = function(dbConnection, Sequelize) {

	return dbConnection.define('answered_question', {
		session_id: {
			type: Sequelize.INTEGER,
			notNull: true,
			notEmpty: true
		},
		question_id: {
			type: Sequelize.INTEGER,
			notNull: true,
			notEmpty: true
		},
		answer_id: {
			type: Sequelize.INTEGER,
			notNull: true,
			notEmpty: true
		}
	});
	
};