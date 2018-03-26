var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var RedisStore = require('connect-redis')(session);
var compression = require('compression')
var app = express();
app.use(compression())
const api = require('./config/routes');

// view engine setup
// app.set('views', path.join(__dirname, __dirname + "/public/client/dist"));
// app.set('view engine', 'jade')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", express.static(__dirname + "/public/client/dist"));
app.use("/addevent", express.static(__dirname + "/public/client/dist"));

let db = require('./config/connections.js')

// app.use('/', index);
// app.use('/users', users);

app.use(session({
  secret:'SECR*T',
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    ttl: null,
    db: 0,
    pass: null,
    prefix: 'sess:'
  }),
  cookie: { secure: false },
  resave:false,
  saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(api); 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
app.listen(1337)
module.exports = app;