const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');

const girlUrl = 'http://www.mzitu.com';

superagent.get(girlUrl).end((err, res) => {
    if (err) {
        return console.error(err);
    }
    let girlDatas = [];
    let $ = cheerio.load(res.text);
    $('#pins li').each((idx, el) => {
        let $el = $(el);
        const girlData = {
            href: $el.find('a').attr('href'),
            title: $el.find('a').find('img').attr('alt'),
            titleImg: $el.find('a').find('img').attr('data-original'),
        }
        girlDatas.push(girlData);
    });

    const ep = new eventproxy();
    ep.after('img_html', girlDatas.length, (imgPages) => {
        imgPages = imgPages.map((imgPair) => {
            let [pageUrl, pageHtml] = imgPair;
            let $ = cheerio.load(pageHtml);
            return ({
                href: pageUrl,
                img: $('.main-image img').attr('src'),
            });
        });
        console.log(imgPages);
    });
    girlDatas.forEach((pageUrl) => {
        superagent.get(pageUrl).end((err, res) => {
            console.log('fetch ' + pageUrl + ' successful');
            ep.emit('img_html', [pageUrl, res.text]);
        });
    });

    console.log(girlDatas);
});
