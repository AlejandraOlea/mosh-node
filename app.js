const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("hello again and again");
    res.end();
  }
  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
  // res.end("Hello from the server");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000");
});

//Regsiter a listner
// const Logger = require("./logger");
// const logger = new Logger();

// logger.on("logging", (arg) => {
//   console.log("logged in", arg);
// });

// logger.log("message");
