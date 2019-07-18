//import express from "express";
var http = require('http');
var users = require("./state").users;
var products = require("./state").products;
var server = http.createServer(messageReceived);
server.listen(8080);

function messageReceived(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  if(req.method === "GET" && req.url === "/users"){
    let usersJSON = JSON.stringify(users); //must turn object into string for http
    res.write(usersJSON)
  } 
  else if(req.method === "GET" && req.url.indexOf("/users") > -1) {
    let id = req.url.split("/");
    let user = users.find(p=>p["id"] === Number(id[2]));
    let userJSON = JSON.stringify(user);
    res.write(userJSON)
  }  
  if(req.method === "GET" && req.url === "/products"){
    let productsJSON = JSON.stringify(products); //must turn object into string for http
    res.write(productsJSON)
  } 
  else if(req.method === "GET" && req.url.indexOf("/products") > -1) {
    let id = req.url.split("/");
    let product = products.find(p=>p["id"] === Number(id[2]));
    let productJSON = JSON.stringify(product);
    res.write(productJSON)
  }  
  
  else if(req.method === "POST" && req.url === "/users"){
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      let user = JSON.parse(body);
      users.push(user);
    });
  }
  else if(req.method === "POST" && req.url === "/products"){
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      let product = JSON.parse(body);
      products.push(product);
    });
  }

  else if(req.method === "PUT" && req.url.indexOf("/users") > -1){
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      let user = JSON.parse(body);
      let id = req.url.split("/");
      users.find(p=>p["id"] === Number(id[2]));
      //users[Number(id[2])] = user;
      users.splice(Number(id[2]), 1, user);
    });
  } 

  else if(req.method === "DELETE" && req.url.indexOf("/users") > -1){
//     let body = [];
//     req.on('data', (chunk) => {
//       body.push(chunk);
//     }).on('end', () => {
//       body = Buffer.concat(body).toString();
    let id = req.url.split("/");
    users.find(p=>p["id"] === Number(id[2]));
    users.splice(Number(id[2]), 1);
    res.write("deleted");
  }
res.end();
}




