var createError = require('http-errors');
var express = require('express'); 
var app = express();
// google login
const passport = require('passport');
const cookieSession = require('cookie-session');
require('dotenv').config()
// const passportSetuo = require('./passport')
// gogole login
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let PORT = 3001 || process.env.PORT
let mongoose = require('mongoose')
const cors = require('cors')


var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var doctorRouter = require('./routes/doctor');
// var googleRouter = require('./routes/googleLogin');




// for google login

app.use(cookieSession({
	name: 'google-auth-session',
	keys: ['key1', 'key2'] ,
    secret: 'somethingsecretgoeshere',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use((request, response, next) => {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})


app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: process.env.ORIGIN_URL,
  methods : "GET,POST,PUT,DELETE,PATCH",
  credentials:true
}))

// google login


// mongoose connect 

mongoose.connect(process.env.MONGODB,{});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/upload' , express.static('./upload'))


app.use('/admin',adminRouter );
app.use('/', usersRouter);
app.use('/doctor', doctorRouter);
// app.use('/google', googleRouter);

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
 
  res.send('error');
});


app.listen(PORT, () => {
  console.log(`server is runnig http://localhost:${PORT}`);
})

module.exports = app;


