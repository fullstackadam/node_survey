var sequelize = require('sequelize');

var Answer = sequelize.define('answer', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE
});

module.exports = Answer;