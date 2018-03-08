const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');

const cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end(function (err, res) {
    if (err) {
        return console.err(err);
    }
    let topicUrls = [];
    const $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function (idx, el) {
        const $el = $(el);
        let href = url.resolve(cnodeUrl, $el.attr('href'));
        topicUrls.push(href);
    });
    
    const ep = new eventproxy();
    ep.after('topic_html', topicUrls.length, function (topics) {
        topics = topics.map(function (topicPair) {
            let topicUrl = topicPair[0];
            let topicHtml = topicPair[1];
            let $ = cheerio.load(topicHtml);
            return ({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.reply_content').eq(0).text().trim(),
                author: $('.user_card .user_name a').text().trim(),
                score: $('.big').text().trim(),
            });
        });
        console.log('final:');
        console.log(topics);
    });
    topicUrls.forEach(function (topicUrl) {
        superagent.get(topicUrl).end(function (err, res) {
            console.log('fetch ' + topicUrl + ' successful');
            ep.emit('topic_html', [topicUrl, res.text]);
        });
    });
});
