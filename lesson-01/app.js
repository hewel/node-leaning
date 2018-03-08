var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('韦汀晏，我爱你');
});

app.listen(3300, function() {
    console.log('http://localhost:3300/');
});
