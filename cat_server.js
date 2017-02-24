var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/cats');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var catRoutes = require('./routes/cat.js')(app);
var server = app.listen(3000, function () {
    console.log('server running at port 3000')
});
