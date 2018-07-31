const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

router
    .get('/', async (ctx) => {
        ctx.body = 'Home';
    })
    .get('/news/:aid', async (ctx) => {
        ctx.body = 'News';
        console.log(ctx.params);
    })
    .get('/a', async ctx => {
        ctx.body = 'A'; 
    });

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(4300);
