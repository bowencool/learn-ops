const http = require("http");
const fs = require("fs");

const leak = [];

http
  .createServer((req, res) => {
    console.log(req.url);
    const content = fs.readFileSync("./test.html");
    // console.log(window.location.href);
    leak.push(content);
    res.end(content);
  })
  .listen(3000, () => console.log("listened 3000"));
