const http = require("http");

http
  .createServer((req, res) => {
    console.log(req.url);
    console.log(window.location.href);
    res.end("hello");
  })
  .listen(3000, () => console.log("listened 3000"));
