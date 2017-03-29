var express = require('express')
var app = express()

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.get('/bye', function(req, res) {
    res.send('goodbye cruel World!')
})

app.listen(4001, function() {
    console.log('Example app listening on port 4001!')
})