import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dbConnection from './config/db'; // Sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);
import express from 'express';
import guestController from './controllers/guestController';
import adminController from './controllers/adminController';
import questionController from './controllers/questionController';
import choiceController from './controllers/choiceController';
	//csrf token library

const app = express();

app.use(bodyParser.json({ type: 'application/*+json' }));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));


app.use(cookieParser());

//keep guest sessions for 14 days 
//keep admin sessions for 30 minutes

const twoWeeks = 1000 * 60 * 60 * 24 * 14,
	thirtyMinutes = 1000 * 60 * 30;

app.use(session({
	secret: 'keyboard cat', // put in env file
	store: new SequelizeStore({
		db: dbConnection,
		table: 'session',
		checkExpirationInterval: thirtyMinutes,
		expiration: twoWeeks
	})
}));

const port = process.env.PORT || 3000;

guestController(app);
adminController(app);
questionController(app);
choiceController(app);

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port);