const koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');
const static = require('koa-static');

const app = new koa();

app
    .use(views(__dirname + '/views', {
        extension: 'pug'
    }))
    .use(static(__dirname + '/static'));
router
    .get('/', async ctx => {
        let title = 'Hello Pug!';
        await ctx.render('index', {
            title,
        });
        ctx.cookies.set('apc', '454', {
            maxAge: 60*1000*60,
        });
    })
    .get('/login', async ctx => {
        ctx.body = 'Login';
        let tData = ctx.cookies.get('apc');
        console.log(tData);
    });

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(2000);
console.log('http://localhost:2000/');
