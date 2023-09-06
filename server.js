const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const colors = require('colors');
const morgan = require('morgan');

// Access config variables
dotenv.config({ path: './config/config.env' });

// Access route files
const posts = require('./routes/posts');

// Initialize App
const app = express();

// Use Express parser
app.use(express.json());

// Log what's happening
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/posts', posts);

// Use error handler
app.use(errorHandler);

//allow CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var currentLocation = { longitude: '12.8490437', latitude: '72.8160861' };
var currentLocationMap = {
  1: { longitude: '18.998775', latitude: '72.8160861' },
};
app.get('/loc', (req, res) => {
  if (req.query.id || req.query.id == 0 || !currentLocationMap[req.query.id]) {
    res.send(currentLocation);
  } else {
    res.send(currentLocationMap[req.query.id]);
  }
});

app.post('/loc', (req, res) => {
  console.log(req.body);
  currentLocation.longitude = req.body.longitude;
  currentLocation.latitude = req.body.latitude;

  res.send('success');
});
app.get('/locget', (req, res) => {
  console.log(req.query);
  if (req.query.longitude && !req.query.id && req.query.id != 0) {
    currentLocation.longitude = req.query.longitude;
    currentLocation.latitude = req.query.latitude;
  } else if (req.query.longitude) {
    if (!currentLocationMap[req.query.id]) {
      currentLocationMap[req.query.id] = {};
      currentLocationMap[req.query.id].id = req.query.id;
    }
    currentLocationMap[req.query.id].longitude = req.query.longitude;
    currentLocationMap[req.query.id].latitude = req.query.latitude;
  }
  res.send('success');
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// If Promise is rejected
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
