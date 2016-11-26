var express = require('express'),
	authMiddleware = require('./middleware/authMiddleware'),
	guestController = require('./controllers/guestController'),
	adminController = require('./controllers/adminController'),
	models = require('./models');

var app = express();

var port = process.env.PORT || 3000;

authMiddleware(app);

guestController(app);
adminController(app);

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port);