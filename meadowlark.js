"use strict";
const express = require('express');
const handlebars = require('express-handlebars');
let fortune = require('./lib/fortune.js');

const app = express();

// set up handlebars view engine
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');


// port
app.set('port', process.env.PORT || 3000);


// static middleware
app.use(express.static(__dirname + '/public'));


// routing
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about', { fortune: fortune.getFortune() });
});


// custom 404 page
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('404');
});

// listen on PORT - default 3000
app.listen(app.get('port'), function() {
    console.log("Express started on localhost:" + app.get('port') + '; press Ctrl-C to terminate.');
});