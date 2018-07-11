const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');

const girlUrl = 'https://www.javbus2.pw/';

superagent.get(girlUrl).end((err, res) => {
    if (err) {
        return console.error(err);
    }
    let girlDatas = [];
    let $ = cheerio.load(res.text);
    $('#waterfall .item').each((idx, el) => {
        let $el = $(el);
        const girlData = {
            href: $el.find('.movie-box').attr('href'),
            title: $el.find('.photo-info').find('span').text(),
            titleImg: $el.find('.photo-frame').find('img').attr('src'),
        }
        girlDatas.push(girlData);
    });

    // const ep = new eventproxy();
    // ep.after('img_html', girlDatas.length, (imgPages) => {
    //     imgPages = imgPages.map((imgPair) => {
    //         let [pageUrl, pageHtml] = imgPair;
    //         let $ = cheerio.load(pageHtml);
    //         return ({
    //             href: pageUrl,
    //             img: $('.main-image img').attr('src'),
    //         });
    //     });
    //     console.log(imgPages);
    // });
    // girlDatas.forEach((pageUrl) => {
    //     superagent.get(pageUrl).end((err, res) => {
    //         console.log('fetch ' + pageUrl + ' successful');
    //         ep.emit('img_html', [pageUrl, res.text]);
    //     });
    // });

    console.log(girlDatas);
});
