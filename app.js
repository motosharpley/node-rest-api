const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const configDB = require('./config/database');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// connect to mongoDB
mongoose.connect(configDB.database);
const db = mongoose.connection;
// Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});
// Check for db errors
db.on('error', function(err){
    console.log(err);
});

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;