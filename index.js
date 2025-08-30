/*
editorcoder
2025-08-29
SRJC CS55.13 Fall 2025
Week 2: Assignment 3: Node.js + React Basics 
index.js
*/

const ec_http = require("http"); // load Node.js http module
const ec_fs = require("fs").promises; // load Node.js fs module, promise version
const addressIP = "127.0.0.1"; // assign IP address
const tcpPort = 8080; // assign TCP port number

// define a requestListener function to receive and respond to http requests
const ec_requestListener = function (request, response) {
  console.log(request.url); // log the request URL to the console
  switch (request.url) { // check request url,
    case "/": // if root, return '/cat_game.html' file
      ec_fs.readFile(__dirname + "/cat_game.html").then((contents) => {
        response.setHeader("Content-Type", "text/html; charset=UTF-8");
        response.writeHead(200);
        response.end(contents);
      });
      break;
    case "/cat_game.css": // if it is '/cat_game.css', return that file
      ec_fs.readFile(__dirname + "/cat_game.css").then((contents) => {
        response.setHeader("Content-Type", "text/css; charset=UTF-8");
        response.writeHead(200);
        response.end(contents);
      });
      break;
    case "/cat_game_data": // if it is '/cat_game_data' return the 'cat_game.json' file --
      // for use with the getJSON method in the custom script in cat_game.html
      ec_fs.readFile(__dirname + "/cat_game.json").then((contents) => {
        response.setHeader("Content-Type", "application/json; charset=UTF-8");
        response.writeHead(200);
        response.end(contents);
      });
      break;
    default: // if request url is anything else, return an error message with a link back to the home page
      response.setHeader("Content-Type", "text/html; charset=UTF-8");
      response.writeHead(200);
      response.write(
        "<h1>Invalid Request!</h1><p><a href='/'>[Return home]</a></p>"
      );
      response.end();
  }
};

// create an http server
const ec_server = ec_http.createServer(ec_requestListener);

// start the server: listen for requests at the specified port and IP address using the .listen() method
ec_server.listen(tcpPort, addressIP);
console.log(`Server is running on http://${addressIP}:${tcpPort}...`);
