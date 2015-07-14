"use strict";
const express = require('express');
const handlebars = require('express-handlebars');

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
    let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
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


let fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];