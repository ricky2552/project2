var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require("body-parser");
var async = require("async");

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

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


    res.render('async1', { listings: listings })
})

//query
app.post('/query', function(req, res) {

    console.log(req.body);
    async.series([function(callback) {
            var connection = mysql.createConnection({
                host: '206.12.96.242',
                user: 'group3',
                password: 'untanglingGroup3',
                database: 'group3DB'
            });
            connection.connect();
            var q = 'SELECT * FROM books WHERE seller LIKE "' + req.body.queryStr + '"';
            //console.log(q);
            connection.query(q, function(err, rows, fields) {
                if (err) throw err;

                listings = rows;
                //console.log(rows[0]);
                connection.end();
                callback(null, "query done");
            });


        }, function(callback) {
            res.redirect("/");
            callback(null, "display done");
        }


    ], function(err, results) {
        //console.log(results);
        //could do some error processing here
    });



});

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