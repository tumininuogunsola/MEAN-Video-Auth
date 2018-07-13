const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport')
const config = require('./config/database')

 // connection to database
mongoose.connect(config.database, {useNewUrlParser: true});

//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database );
})

//  on database error
mongoose.connection.on('error', (err) => {
    console.log('Connected to database '+err  );
})

var routes = require('./routes/users');

// Define the port to run on
app.set('port', 3000);

app.use(cors());


// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session())

require("./config/passport")(passport);

// Add some routing
app.use('/api/user', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/ngApp/index.html'))
})

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});