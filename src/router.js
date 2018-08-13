'use strict';

var config = require('./lib/config');
var availableLanguages = config().languages.list.join('|');
var defaultController;
var pagesController;

module.exports = function(app) {
	// Routes
	defaultController 	= require('./controllers/' + config().controllers.default);
	pagesController 	= require('./controllers/pages');

	// Default css & js files
	app.use(function(req, res, next) {
		res.locals.css = [
			'stylesheets/style.css'
		];

		res.locals.js = [];

		next();
	});

	// Controller dispatch
	app.use('/', defaultController);
	app.use('/home', pagesController);

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
}
