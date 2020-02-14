const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    console.log(window.location);
    fs.createReadStream("./test.html").pipe(res);
  })
  .listen(3000, () => console.log("listened 3000"));

// while (true) {}
