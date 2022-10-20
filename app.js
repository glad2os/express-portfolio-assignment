const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const projectRouter = require('./routes/projects');
const servicesRouter = require('./routes/services');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const loginRouter = require('./routes/login');
const businessRouter = require('./routes/business');
const apiRouter = require('./api/index');
const session = require("express-session");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let _session = session({secret: process.env.SECRET ? process.env.SECRET : "test_string", saveUninitialized: true, resave: true, cookie: {maxAge: 604800000}});

app.use(_session) // 1 week
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/projects', projectRouter);
app.use('/contact', contactRouter);
app.use('/services', servicesRouter);
app.use('/login', loginRouter);
app.use('/business', businessRouter);
app.use('/api', apiRouter);

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

module.exports = app;
