const http = require("http");

http
  .createServer((req, res) => {
    console.log(req.url);
    throw new Error("fuck");
    res.end("hello");
  })
  .listen(3000, () => console.log("listened 3000"));
