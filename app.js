var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var keys = require('./config/data');
require('./model/User');
require('./services/passport');

require("./model/Recipe");
//require("./seeds/seeds")

//var recipe = require("./model/Recipe")
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true }).then(() => console.log('we are connect')).catch((err) => console.log(err));
var app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [ keys.cookieKey ]
	})
);
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());

//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./routes/users')(app);
require("./routes/recipeRoute")(app);
app.use('/', indexRouter);
//app.use('/users', usersRouter);
if(process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like our main.js file, or main.css file!
	app.use(express.static('client/build'));
  
	// Express will serve up the index.html file
	// if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
  }

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

module.exports = app;
