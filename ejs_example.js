var express = require('express')
var app = express()

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

app.get('/', function(req, res) {
    res.render('simple2')
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

app.listen(8000, function() {
    console.log('Example app listening on port 8000!')
})