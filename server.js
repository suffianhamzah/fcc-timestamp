// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// unix timestamp converter
app.get("/timestamp/:date", (request, response) => {
  
  var date = request.params.date;
  // check if date is a valid unix or valid date

  var valid_date = {
    'unix': null,
    'natural': null
  };
  //check if the string only contains numbers: !isNaN(parseFloat(n)) && isFinite(n) from https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
  if (isNumeric(date)) {
    console.log(Number.isNaN(parseFloat(date)));
    var unix = parseFloat(date);
    valid_date = {
      'unix': unix,
      'natural': moment.unix(unix).format("MMMM Do, YYYY")
    }
    console.log(valid_date);
  } else {
    
    var str_date = moment(date);
    if (str_date.isValid()) {
      valid_date.unix = str_date.unix(),
      valid_date.natural = str_date.format("MMMM Do, YYYY");
    };

  }
  
  function isNumeric(str) {
    return /^[0-9]+$/.test(str);
  };
  
  response.send(JSON.stringify(valid_date));
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
