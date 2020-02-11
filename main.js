const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  for (let i = 0, len = os.cpus().length / 2; i < len; i++) {
    cluster.fork();
    // cluster.on("exit", worker => {
    //   // todo: Many times
    //   console.error("exit", worker.id, worker.process.pid);
    //   setTimeout(() => {
    //     cluster.fork();
    //   }, 5000);
    // });
  }
} else {
  require("./http");
  process.on("uncaughtException", err => {
    console.error("uncaughtException", err.message);
    process.exit(1);
  });
}
