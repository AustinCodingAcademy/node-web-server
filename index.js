var http = require('http');
let users = require("./state").users;
let server = http.createServer(messageReceived);
server.listen(8080);

function messageReceived(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

//Give your server the ability to respond to a GET request with a path "/users" and return the users array from state.js   
    if(req.method === "GET" && req.url === "/users"){
    let usersJSON = JSON.stringify(users);
    res.write(usersJSON);
  }

//Give your server the ability to respond to a GET request with a path "/users/1" and return the first user object from the users array from state.js  
    else if(req.method === "GET" && req.url.indexOf("/users/") > -1){
    let id = req.url.split("/");
    let user = users.find(p=>p["_id"] == id[2]);
    let usersJSON = JSON.stringify(user);
    res.write(usersJSON);
  }

//Give your server the ability to respond to a POST request with a path "/users" and just add a hard coded user object to the users array from state.js. .json() the last user in the array to send it back to the client. (if you do another GET request you should see this added)    
    else if(req.method === "POST" && req.url === "/users"){
    postUsers(req, res);
  }

//Give your server the ability to respond to a PUT request with a path "/users/1" and just change any key value on the first user object in the users array in state.js. .json() this user to send it back to the client.
    else if(req.method === "PUT" && req.url === "/users/1"){
    let newUserName = users[0].id.s
    res.write(newUserName)
  }

  else {
   res.write("Not Found");
  }
  res.end();
}


//FUNCTION TO ALLOW YOU TO POST TO THE USERS OBJECT
function postUsers(req, res){
    let body = [];
   req.on('data', (chunk) => {
     body.push(chunk);
   }).on('end', () => {
     body = Buffer.concat(body).toString();
     let userPost = JSON.parse(body);
     users.push(userPost);
   });
  }

// function putUsers(req, res){
//     let body = [];
//    req.on('data', (chunk) => {
//      body.push(chunk);
//    }).on('end', () => {
//      body = Buffer.concat(body).toString();
//      let userPut = JSON.parse(body);
//      users.push(userPut);
//    });
//   }
   
