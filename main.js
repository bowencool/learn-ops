const cluster = require("cluster");
const os = require("os");

const MB = 2 ** 20;
// const LEN = 2;
const LEN = os.cpus().length / 2;

if (cluster.isMaster) {
  function fork() {
    const worker = cluster.fork();
    let missed = 0;
    // 开启心跳
    const timer = setInterval(() => {
      worker.send("ping");
      console.log("ping", worker.process.pid);
      missed++;
      if (missed >= 3) {
        process.kill(worker.process.pid);
      }
    }, 1000);

    // 停止心跳，自动重启
    worker.on("exit", (code, signal) => {
      clearInterval(timer);
      console.warn("worker %d died. restarting...", worker.process.pid);
      setTimeout(() => {
        fork();
      }, 3000);
    });

    worker.on("message", msg => {
      console.log(msg);
      missed--;
    });
  }

  for (let i = 0; i < LEN; i++) {
    fork();
  }
  // 自动重启
  // cluster.on("exit", (worker, code, signal) => {
  //   console.warn("worker %d died. restarting...", worker.process.pid);
  //   setTimeout(() => {
  //     fork();
  //   }, 3000);
  // });
} else {
  require("./http");
  // 异常监控
  process.on("uncaughtException", err => {
    console.error("uncaughtException", err.message);
    process.exit(1);
  });
  // 心跳
  process.on("message", msg => {
    if (msg === "ping") {
      process.send("pong");
    }
  });
  // 内存监控
  setInterval(() => {
    const mu = process.memoryUsage().rss;
    console.log("🌗", process.pid, `${(mu / MB).toFixed(2)}MB`);
    if (mu > 100 * MB) {
      process.exit(1);
    }
  }, 5000);
}
