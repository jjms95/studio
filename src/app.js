'user strict';

// Application errors
var createError = require('http-errors');

// Express application
var express = require('express');
var path = require('path');

// Initializating Express app
var app = express();

// Loading config
var config = require('./lib/config');

// Cookies | sessions
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Body parcer
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Logger
var logger = require('morgan');
app.use(logger('dev'));

// Layout Setup
var expHbs = require('express-handlebars');

// Stylus Setup
var stylus = require('stylus');

// Compile stylus
if (!config().html.css.stylusPrecompile) {
	app.use(
		stylus.middleware({
			src: __dirname + '/stylus',
			dest: __dirname + '/public/javascripts',
			compile: function() {
				return stylus(str)
					.set('filename', path)
					.set('compress', config().html.css.compress);
			}
		})
	);
}

// Handlebars setup
app.engine(config().views.engine, expHbs({
	extname: config().views.extension,
	defaultLayout: config().views.layout,
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials'
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));

//Disabling x-powered by
app.disable('x-powered-by');

// Router
require('./router')(app);

// Export app or start the server
if (!!module.parent) {
	module.exports = app;
} else {
	app.listen(config().serverPort);
}
