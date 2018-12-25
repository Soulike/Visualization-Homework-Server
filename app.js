const Koa = require('koa');
const router = require('./router');
const app = new Koa();

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(2333, () =>
{
    console.log('Server is running on port 2333');
});
