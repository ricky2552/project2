var express = require('express');
var mysql = require('mysql');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
var connection = mysql.createConnection({
    host: '206.12.96.242',
    user: 'group3',
    password: 'untanglingGroup3',
    database: 'group3DB'
});
connection.connect();

var listings;

connection.query('SELECT * FROM books', function(err, rows, fields) {
    if (err) throw err;

    listings = rows;
    console.log(rows[0]);
});

connection.end();

app.get('/', function(req, res) {


    res.render('simple1', { listings: listings })
})

// about page 
app.get('/about', function(req, res) {
    var sentence = "this is a test about page, passed as a variable through ejs";
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    res.render('about', {
        drinks: drinks,
        sentence: sentence
    });
});

app.listen(8003, function() {
    console.log('Example app listening on port 8003!')
})