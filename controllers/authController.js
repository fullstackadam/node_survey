export default (app) => {
	app.post('/login', function() {
		User.findOne({ email: req.body.email }, function(err, user) {
			if (!user) {
				res.render('login.jade', { error: 'Invalid email or password.' });
			} else {
				if (req.body.password === user.password) {
					// sets a cookie with the user's info
					req.session.user = user;
					res.redirect('/dashboard');
				} else {
					res.render('login.jade', { error: 'Invalid email/username or password.' });
				}
			}
		});
	});
}