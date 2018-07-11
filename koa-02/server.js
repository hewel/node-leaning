const koa = require('koa');
const fs = require('fs');

const app = new koa();
const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./page/index.html');
};
app.use(main);
app.listen(3000);
console.log('http://localhost:3000/');
