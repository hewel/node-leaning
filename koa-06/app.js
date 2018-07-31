const koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');

const app = new koa();

app
    .use(views(__dirname + '/views', {
        extension: 'pug'
    }))
    .use(bodyParser());
    
router
    .get('/', async ctx => {
        let title = 'Hello Pug!';
        await ctx.render('index', {
            title,
        });
    })
    .get('/login', async ctx => {
        ctx.body = 'Login';
    });
router
    .post('/p', async ctx => {
        console.log(ctx.request.body);
        ctx.body = await ctx.request.body;
    });
app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(2000);
