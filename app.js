//lib && module import
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var oauthserver = require('oauth2-server');

//routes import
var indexRouter = require('./routes/index');
var citiesRouter = require('./routes/cities');
var countriesRouter = require('./routes/countries');


//import config files
var config = require('./config/config');
var database = require('./config/dbconfig');
var app = express();

//init db
database.init();

//oauth2 client_credencials
app.oauth = oauthserver({
  model: require('./config/oauthModel.js'),
  grants: ['client_credentials'],
  token_type: 'Bearer',
  debug: true,
  accessTokenLifetime: config.oauth.accessTokenLifetime
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//use lib && modules in express
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//header
var allowJson = function (req, res, next) {
  if (req.is('json'))
    req.headers['content-type'] = 'application/x-www-form-urlencoded';

  next();
};
//add routes to express
//home test
app.use('/', indexRouter);
//auth
app.all('/oauth/token', allowJson, app.oauth.grant());
app.get('/auth', app.oauth.authorise(), function (req, res) {
	res.send('Token Correcto!');
});
//basic 
app.use('/ciudades', app.oauth.authorise(), citiesRouter);
app.use('/paises', app.oauth.authorise(), countriesRouter);

//err oauth
app.use(app.oauth.errorHandler());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//open ports
app.listen(config.server.port);
console.log(`Servidor escuchando en puerto ${config.server.port}`);
module.exports = app;
