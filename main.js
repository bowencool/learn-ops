const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  for (let i = 0, len = os.cpus().length / 2; i < len; i++) {
    cluster.fork();
  }
} else {
  require("./index");
}
