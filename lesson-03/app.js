const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');

let app = express();
app.get('/', function (req, res, next) {
    superagent.get('https://cnodejs.org/').end(function (err, sres) {
        if (err) {
            return next(err);
        }
        let items = [];
        const $ = cheerio.load(sres.text);
        const hrefHead = 'http://cnodejs.org';
        $('#topic_list .cell').each(function (idx, element) {
            let $elTitle = $(element).find('.topic_title');
            let $elAuthor = $(element).find('.user_avatar img');
            items.push({
                title: $elTitle.attr('title'),
                href: hrefHead + $elTitle.attr('href'),
                author: $elAuthor.attr('title')
            });
        });
        res.send(items);
    });
});
app.listen(3000, function (req, res) {
    console.log('http://localhost:3000/');
});
