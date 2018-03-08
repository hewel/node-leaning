const express = require('express');
const utils = require('utility');
var app = express();

app.get('/', function (req, res) {
    var q = req.query.q;
    var md5Value = utils.md5(q);
    var sha1Value = utils.sha1(q);
    res.send(sha1Value);
});

app.listen(3000, function (req, res) {
    console.log('http://localhost:3000/?q=alsotang');
});
