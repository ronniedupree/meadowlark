var express = require('express');
var handlebars = require('express-handlebars');
var fortune = require('./lib/fortune.js');

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

// testing middleware
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});


// ROUTES
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
    res.render('tours/request-group-rate');
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