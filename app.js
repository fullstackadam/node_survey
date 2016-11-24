var express = require('express');
var mainController = require('./controllers/mainController');

var app = express();

var port = process.env.PORT || 3000;

mainController(app);

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port);