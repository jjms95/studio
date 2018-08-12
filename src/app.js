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
app.use(bodyParser.urlencoded({ extended: false }));

//Logger
var logger = require('morgan');
app.use(logger('dev'));

// Layout Setup
var expHbs = require('express-handlebars');

// Stylus Setup
var stylus = require('stylus');
var nib = require('nib');

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

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


// Export app or start the server
if(!!module.parent){
	module.exports = app;
}
else {
	app.listen(config().serverPort);
}
