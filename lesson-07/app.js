const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

http.createServer((req, res) => {
    let sPathName = url.parse(req.url).pathname;
    if (sPathName == '/') {
        sPathName = '/index.html';
    }
    let sExtName = path.extname(sPathName);
    if (sPathName != '/favicon.ico') {
        fs.readFile('static/' + sPathName, (tStaticErr, tStaticData) => {
            if (tStaticErr) {
                fs.readFile('static/404.html', (tLostErr, tLostData) => {
                    if (tLostErr) {
                        console.log(tLostErr);
                    }
                    res.writeHead(404, {
                        "Content-Type": "text/html;charset='utf-8'"
                    });
                    res.write(tLostData);
                    res.end();
                });
            } else {
                res.writeHead(200, {
                    "Content-Type": `${getExtension(sExtName)};charset='utf-8'`
                });
                res.write(tStaticData);
                res.end();
            }
        });
    }
}).listen(4400);
function getExtension(tExtName) {
    switch (tExtName) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        default:
            return 'text/html';
    }
}
