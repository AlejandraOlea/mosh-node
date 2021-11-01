const EventEmitter = require("events");

const url = "http://mylogger.io/log";

class Logger extends EventEmitter {
  log(message) {
    //send ah http request
    console.log(message);

    //Raising an event
    this.emit("logging", { id: 1, url: "http://" });
  }
}

module.exports = Logger;
