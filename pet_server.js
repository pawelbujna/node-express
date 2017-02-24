var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var petRoutes = require('./routes/pet.js')(app);
var server = app.listen(3002, function () {
    console.log('server running at port 3002')
});
