
 var http = require('http');
 let users = require('./state').users;
 let products = require('./state').products;
 let server = http.createServer(messageReceived);

 server.listen(8080);
 
  function messageReceived(req, res) {
     res.writeHead(200, {'Content-Type': 'text/plain'});


      if(req.method === "GET" && req.url.indexOf("/users/") > -1){
        let id = req.url.split("/");
        let user = users.find(p=>p["_id"] == id[2]);
        let product = products.find(p=>p["_id"] == id[2]);
        let usersJSON = JSON.stringify(user);
        let productsJSON = JSON.stringify(product);
        res.write(usersJSON);
        res.write(productsJSON);


    }
 
    else if(req.method === "GET" && req.url === "/users/"){
         let usersJSON = JSON.stringify(users);
         res.write(usersJSON);
     }
     else if(req.method === "POST" && req.url === "/users/"){
       let body = [];
           req.on('data', (chunk) => {
               body.push(chunk);
           }).on('end', () => {
               body = Buffer.concat(body).toString();
               let user = JSON.parse(body);
               users.push(user);
           });
       }
    
      else if(req.method === "PUT" && req.url === "/users/"){
         res.write("you wanted to update a user")
     }
 
      else if(req.method === "DELETE" && req.url === "/users/"){
         res.write("you wanted to delete a user")
     }
 
      else{
     res.write("404 Not Found");
     }
     res.end();
 } 