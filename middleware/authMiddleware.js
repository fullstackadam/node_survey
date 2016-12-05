module.exports = function(req, res, next) {
		if (!req.session.admin) {
			console.log('fail--');
			
			res.redirect('/login');
		} else {
			console.log('pass--');
			next();
		}
};