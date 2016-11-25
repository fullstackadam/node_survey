var Sequelize = require('sequelize');
var path = require('path');
var env = require('environment-vars');

path = path.join(__dirname, '../');
env = env(path, '.env');

module.exports = new Sequelize(env.get('DATABASE'), env.get('USERNAME'), env.get('PASSWORD'), {
  host: env.get('HOST'),
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  benchmark: true
});