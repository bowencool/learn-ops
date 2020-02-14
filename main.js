const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  for (let i = 0, len = os.cpus().length / 2; i < len; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.warn(
      "worker %d died (%s). restarting...",
      worker.process.pid,
      signal || code
    );
    setTimeout(() => {
      cluster.fork();
    }, 3000);
  });
} else {
  require("./http");
  process.on("uncaughtException", err => {
    console.error("uncaughtException", err.message);
    process.exit(1);
  });
}
