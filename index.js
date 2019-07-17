var http = require('http');
let state = require('./state');
let users = state.users;
let products = state.products;


let server = http.createServer(messageReceived);
server.listen(8080);

function messageReceived(req, res) {
 res.writeHead(200, {'Content-Type': 'text/plain'});
 if(req.method === "GET" && req.url === "/users"){
    let stateJSON = JSON.stringify(state);
     res.write(stateJSON);
 }
 else if(req.method === "GET" && req.url.indexOf("/users/") > -1){
    let id = req.url.split('/');
    let user = users.find(u=>u["_id"] === Number(id[2]))
    let userJSON = JSON.stringify(user);
     res.write(userJSON); 
 }
 else if(req.method === "POST" && req.url ==="/users"){
    let body = [];
    req.on('data', (chunk)=>{
        body.push(chunk);
    }).on('end', ()=>{
     body = Buffer.concat(body).toString();
     let user = JSON.parse(body);
     user.id = users.length+1;
     users.push(user);
    });
 } 
 else if(req.method === "PUT" && req.url.indexOf("/users/")> -1){
    let body = [];
    let id = req.url.split('/');
    let update = users.find(u=>u["_id"] === Number(id[2]))
    req.on('data', (chunk)=>{
        body.push(chunk);
    }).on('end', ()=>{
        body = Buffer.concat(body).toString();
        body = JSON.parse(body);
        user.name = body.name;
        res.write(JSON.stringify(user))
        res.end();
    });
 }
 else if(req.method === "DELETE" && req.url.indexOf("/user/")>-1){
    let id = req.url.split('/');
    let update = users.find(u=>u["_id"] === Number(id[2]))
    users.splice(update, 1);
 }
 else{
     res.write("Not Found");
 }
 res.end();
} 
