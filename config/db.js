const Sequelize = require('sequelize'),
	pathMod = require('path'),
	envMod = require('environment-vars'),
	path = pathMod.join(__dirname, '../'),
	env = envMod(path, '.env');

export default new Sequelize(env.get('DATABASE'), env.get('USERNAME'), env.get('PASSWORD'), {
	host: env.get('HOST'),
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	benchmark: true
});