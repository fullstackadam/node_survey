import Sequelize from 'sequelize';
import general from './general';
const {DATABASE, DB_USER, DB_PASS, DB_HOST} = general;

export default new Sequelize(DATABASE, DB_USER, DB_PASS, {
	host: DB_HOST,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	benchmark: true
});