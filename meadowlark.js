"use strict";
const express = require('express');
const app = express();

// set up handlebars view engine
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// port
app.set('port', process.env.PORT || 3000);


// routing
app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('Meadowlark Travel');
});

app.get('/about', function(req, res) {
    res.type('text/plain');
    res.send('About Meadowlark Travel');
});


// custom 404 page
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});


app.listen(app.get('port'), function() {
    console.log("Express started on localhost:" + app.get('port') + '; press Ctrl-C to terminate.');
});