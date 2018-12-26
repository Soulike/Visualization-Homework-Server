const Koa = require('koa');
const router = require('./router');
const app = new Koa();

const PORT = 8004;

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(PORT, () =>
{
    console.log(`Server is running on port ${PORT}`);
});
