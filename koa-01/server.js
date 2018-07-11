const koa = require('koa');

const app = new koa();
const main = (ctx) => {
    ctx.response.body = '金强真的很傻逼！';
}
app.use(main);
app.listen(3000);
console.log('http://localhost:3000/');
