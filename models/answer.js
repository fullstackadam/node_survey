var Sequelize = require('sequelize');

module.exports = function(dbConnection) {
	return dbConnection.define('answer', {
	  text: {
	  	type: Sequelize.STRING,
	  	notNull: true
	  },
	});
};