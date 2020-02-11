const Koa = require("koa");
const chalk = require("chalk");
const redis = require("redis");
const { promisify } = require("util");

const redisClient = redis.createClient({
  host: "redis"
});
const incrAsync = promisify(redisClient.incr.bind(redisClient));

const app = new Koa();

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
  console.log(`${ctx.method} ${ctx.ip} ${ctx.url}`, chalk.green(`${ms}ms`));
});

// response
app.use(async ctx => {
  const count = await incrAsync("count");
  ctx.body = `Hello, you have met me ${count} times`;
});

app.listen(3000, () => {
  console.log("listened 3000\n");
});
