'use strict';

var http = require('http');
let users = require("./state").users;
let server = http.createServer(messageReceived);
server.listen(8080);

function messageReceived(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  if(req.method === "GET" && req.url === "/users"){
    let usersJSON = JSON.stringify(users);
    res.write(usersJSON);
  } else if(req.method === "POST" && req.url === "/users"){
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      let user = JSON.parse(body);
      users.push(user);
    });
    
   } else if(req.method === "GET" && req.url.indexOf("/users/") > -1){
    let id = req.url.split("/");
    let user = users.find(p=>p["_id"] == id[2]);
    let userJSON = JSON.stringify(user);
    res.write(userJSON);
  } else  {
   res.write("Not Found");
  }
  res.end();
}


