var session = require('express-session'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	dbConnection = require('./config/db'), // Sequelize
	SequelizeStore = require('connect-session-sequelize')(session.Store),
	express = require('express'),
	authMiddleware = require('./middleware/authMiddleware'),
	guestController = require('./controllers/guestController'),
	adminController = require('./controllers/adminController'),
	questionController = require('./controllers/questionController');
	//csrf token library
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use(cookieParser());

//keep guest sessions for 14 days 
//keep admin sessions for 30 minutes

var twoWeeks = 1000 * 60 * 60 * 24 * 14;
var thirtyMinutes = 1000 * 60 * 30;

app.use(session({
  secret: 'keyboard cat',
  store: new SequelizeStore({
  	db: dbConnection,
  	table: 'session',
  	checkExpirationInterval: thirtyMinutes,
  	expiration: twoWeeks
  })
}));

var port = process.env.PORT || 3000;

authMiddleware(app);

guestController(app);
adminController(app);
questionController(app);

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port);

