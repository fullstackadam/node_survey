var Sequelize = require('sequelize');



module.exports = function(sequelize) {
	sequelize.authenticate()
	.then(function(err) {
		console.log('Connection has been established successfully.');
	})
	.catch(function (err) {
		console.log('Unable to connect to the database:', err);
	});

	var User = sequelize.define('user', {
		name: {
			type: Sequelize.STRING,
			notNull: true,
			isAlphanumeric: true
		},
		email: {
			type: Sequelize.STRING,
			notNull: true,
			isEmail: true
		},
		password: {
			type: Sequelize.STRING,
			notNull: true
		} // encrypted
	});


	// force: true will drop the table if it already exists
	User.sync({force: true}).then(function () {
	  // Table created
	  return User.create({
	    name: 'Adam',
	    email: 'a@b.com',
	    password: '123'
	  });
	});
};