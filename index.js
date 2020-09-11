// npm init
// npm i express dotenv morgan
// npm i axios
// npm i monkeylearn
// npm i twit

const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

// specify config path
dotenv.config({ path: './config/config.env' });

// initiliase express app
const app = express();

// serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// allow us to use the bodyParser middleware
app.use(express.json());

// logger for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// mount the router
app.use('/api/v1/mashup', require('./routes/api'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// see if we need to keep this...having a clash with the curret. Ask Sam
// <=====================>
// <===PRODUCTION ONLY===>
// <=====================>
if (process.env.NODE_ENV === 'production') {
  // when in product the client/build folder will be our static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Media Analysis Server listening on ${port}`));
