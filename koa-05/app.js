const koa = require('koa');
const router = require('koa-router')();

const app = new koa();
app.use(async (ctx,next) => {
    console.log(ctx.url);
    await next();
    if (ctx.status == 404) {
        ctx.status = 404;
        ctx.body = '404 NOT FOUND';
    }
});
router
    .get('/', async ctx => ctx.body = 'Home')
    .get('/page', async ctx => ctx.body = 'Page')
    .get('/news', async (ctx, next) => {
        ctx.body = 'News';
        console.log('这是新闻页面。')
    })
    .get('/login', async (ctx, next) => {
        ctx.body = 'Login';
        console.log(new Date());
    });

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(2200);
