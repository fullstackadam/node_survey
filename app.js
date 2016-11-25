var express = require('express');
var guestController = require('./controllers/guestController');
var adminController = require('./controllers/adminController');
var dbConnection = require('./config/db');
var userModel = require('./models/user');
var surveyModel = require('./models/survey');
var questionModel = require('./models/question');
var answerModel = require('./models/answer');

var app = express();

var port = process.env.PORT || 3000;



guestController(app);
adminController(app);

userModel(dbConnection);
surveyModel(dbConnection);
questionModel(dbConnection);
answerModel(dbConnection);

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port);