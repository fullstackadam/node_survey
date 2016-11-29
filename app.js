var session = require('express-session'),
	cookieParser = require('cookie-parser'),
	dbConnection = require('./config/db'), // Sequelize
	SequelizeStore = require('connect-session-sequelize')(session.Store),
	express = require('express'),
	authMiddleware = require('./middleware/authMiddleware'),
	guestController = require('./controllers/guestController'),
	adminController = require('./controllers/adminController'),
	models = require('./models');

var app = express();

//if not logged in keep active for 14 days else 30 minutes
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  store: new SequelizeStore({
  	db: dbConnection
  })
}));

var port = process.env.PORT || 3000;

authMiddleware(app);

guestController(app);
adminController(app);

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port);

