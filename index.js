const Koa = require('koa');
const chalk = require('chalk');
const app = new Koa();
console.log('test ENV A=', process.env.A);
console.log(process.argv);

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.ip} ${ctx.url}`, chalk.green(rt));
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World\n';
});

app.listen(3000, () => {
	console.log('app listen at port 3000\n');
});
