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
    let user = users.find(u=>u["id"] === Number(id[2]))
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
     users.push(user);
     user.id = users.length+1;
    });
 } 
 else if(req.method === "PUT" && req.url.indexOf("/users/")> -1){
    let body = [];
    let id = req.url.split('/');
    let update = users.find(u=>u["id"] === Number(id[2]));
    req.on('data', (chunk)=>{
        body.push(chunk);
    }).on('end', ()=>{
        body = Buffer.concat(body).toString();
        body = JSON.parse(body);
        update.name = body.name;
    });
 }
 else if(req.method === "DELETE" && req.url.indexOf("/user/")>-1){
    let id = req.url.split('/');
    let dump = users.find(u=>u["id"] === Number(id[2]));
    //dump.isActive = false;
    users.splice(dump, 1);
    res.write("deleted");
    
 }
 else{
     res.write("Not Found");
 }
 res.end();
} 
