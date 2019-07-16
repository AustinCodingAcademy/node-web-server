const http = require('http');
let state= require('./state');
let users = state.users

let server = http.createServer(messageReceived)

function messageReceived(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    if(req.method==="GET" && req.url==="/users"){
        let usersJSON = JSON.stringify(users);
        res.write(usersJSON);
    }
    else if(req.method==="GET" && req.url==="/users/1"){
        let user = users.find(u => u["_id"] === 1);
        let usersJSON = JSON.stringify(user);
        res.write(usersJSON);
    }
    else if(req.method==="POST" && req.url==="/users"){
        let body =[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        }).on('end',()=>{
            body = Buffer.concat(body).toString();
            let user = JSON.parse(body);
            users.push(user)
        });   
    }
    else if(req.method==="PUT" && req.url==="/users/1"){
        let body =[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        }).on('end',()=>{
            body = Buffer.concat(body).toString();
            let modifiedUser = JSON.parse(body);
            users[0]= modifiedUser
        });  
    }
    else if(req.method==="DELETE" && req.url==="/users/1"){
       users.shift();
       res.write("deleted")
    }
    else if(req.method === "GET" && req.url.indexOf("/users/") > -1){
        let id = req.url.split("/");
        let user = users.find(u=>u["_id"] == id[2]);
        let usersJSON = JSON.stringify(user);
        res.write(usersJSON);
      }
    
    else{
        res.write("Sorry, not found")
    }
    res.end();
}

server.listen(3000, console.log("server is listening on port 3000..."))

