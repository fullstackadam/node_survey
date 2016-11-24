var sequelize = require('sequelize');

var Survey = sequelize.define('survey', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  question: Sequelize.TEXT
});

module.exports = Survey;