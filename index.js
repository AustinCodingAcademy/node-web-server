var http = require('http');
let users = require("./state").users;
let products = require("./state").products
let server = http.createServer(messageReceived);

server.listen(8080);

function messageReceived(req, res) {
    if(req.method === "GET" && req.url.indexOf("/products/") > -1){
        let id = req.url.split("/");
        let product = products.find(p=>p["id"] == id[2]);
        let productsJSON = JSON.stringify(product);
        res.write(productsJSON);
    } else if(req.method === "GET" && req.url.indexOf("/users/") > -1){
        let id = req.url.split("/");
        let user = users.find(p=>p["_id"] == id[2]);
        let usersJSON = JSON.stringify(user);
        res.write(usersJSON);
    } else if(req.method === 'GET' && req.url === '/users'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        let userJSON = JSON.stringify(users);
        res.write(userJSON);  
    } else if(req.method === 'GET' && req.url === '/products'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        let productJSON = JSON.stringify(products);
        res.write(productJSON);
    } else if(req.method === 'POST' && req.url === '/users'){
        let body = [];
        req.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
          let user = JSON.parse(body);
          user._id = users.length + 1;
          users.push(user)
        });
    } else {
        res.write("not found, oops!")
    }
    res.end();
}
