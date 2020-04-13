var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var uploadRouter = require('./routes/upload-file');
var usersRouter = require('./routes/users');
var multer = require('multer');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', uploadRouter);
app.use('/users', usersRouter);

var con = require('./connection');

// //ON HEROKU
// const PORT = process.env.PORT || config.httpPort;
// app.listen(PORT, function () {
//     console.log('server running on port:' + PORT);
// });




  // //ON LOCALHOST
  // var port=3001;
  //  app.listen(port,function(){
  //      console.log('server running on port:'+port);
  // });


 if (typeof localStorage === "undefined" || localStorage === null) {
   const LocalStorage = require('node-localstorage').LocalStorage;
   localStorage = new LocalStorage('./scratch');
 }
 var Storage = multer.diskStorage({
   destination: "./public/uploads/",
   filename: (req, file, cb) => {
     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
   }
 });
 var upload = multer({
   storage: Storage
 }).single('file');


 
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
