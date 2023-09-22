var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { application } = require('express');

var app = express();

let getCounter = 0;
let getPizzas = 0;
let postPizzas = 0;
let deletePizzas = 0;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
    console.log('Request counter :');
    if(req.method == 'GET')
        getCounter++;
    console.log('- GET / : ' + getCounter);
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
