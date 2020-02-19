var createError = require('http-errors');
const http = require('http')
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressHbs = require('express-handlebars');
require("dotenv").config();

const indexRouter = require('./api/routes/index');
const authRoute = require('./api/routes/auth');
const restaurantRoute = require('./api/routes/restaurant');
const menuCategoryRoute = require('./api/routes/menu_category');
const menuItemRoute = require('./api/routes/menu_item');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app)



// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname:'.hbs'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/user', authRoute);
app.use('/api/v1/restaurants', restaurantRoute);
app.use('/api/v1/menu_category', menuCategoryRoute);
app.use('/api/v1/menu_item', menuItemRoute);

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

mongoose.connect(process.env.MONGO_URI,{
  useCreateIndex:true,
  useNewUrlParser:true,
  useFindAndModify:false,
  useUnifiedTopology:true
})
.then(result =>{
  server.listen(port);
  console.log(`Server running on port ${port}`);
  
});

