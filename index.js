const Koa = require("koa");
const chalk = require("chalk");
const redis = require("redis");
const { promisify } = require("util");

const redisClient = redis.createClient({
  host: "redis"
});
const incrAsync = promisify(redisClient.incr.bind(redisClient));

const app = new Koa();

console.log(process.argv);

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.ip} ${ctx.url}`, chalk.green(rt));
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// response
app.use(async ctx => {
  const count = await incrAsync("count");
  ctx.body = `Hello, you have met me ${count} times\n`;
});

app.listen(3000, () => {
  console.log("app listen at port 3000\n");
});
