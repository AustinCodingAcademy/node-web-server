var http = require('http');
let state = require("./state");
let users = require("./state").users;
let products = require("./state").products;


let server = http.createServer(messageReceived);

server.listen(8080);

function messageReceived(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // return all users data
    // http://192.168.149.13:8080/users
    if (req.method === "GET" && req.url === "/users") {
        let stateJSON = JSON.stringify(state.users);
        res.write(stateJSON);
    }
    // return all products data
    // http://192.168.149.13:8080/products
    else if (req.method === "GET" && req.url === "/products") {
        let stateJSON = JSON.stringify(state.products);
        res.write(stateJSON);
    }
    // return specific user by id
    // http://192.168.149.13:8080/users/"targetIndex"
    else if (req.method === "GET" && req.url.indexOf("/users/") > -1) {
        let id = req.url.split("/");
        let user = users.find(u => u["_id"] === parseInt(id[2]))
        let usersJSON = JSON.stringify(user);
        res.write(usersJSON);
    }
    // return specific products by id
    // http://192.168.149.13:8080/products/"targetIndex"
    else if (req.method === "GET" && req.url.indexOf("/products/") > -1) {
        let id = req.url.split("/");
        let product = products.find(p => p["id"] == id[2]);
        let productsJSON = JSON.stringify(product);
        res.write(productsJSON);
    }
    // Run POST to update and add new users content
    // http://192.168.149.13:8080/users
    else if (req.method === "POST" && req.url === "/users") {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let user = JSON.parse(body);
            users.push(user);
        });
        res.write("POST request successful, status 201");
    }
    // Run POST to update and add new products content
    // http://192.168.149.13:8080/products
    else if (req.method === "POST" && req.url === "/products") {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let product = JSON.parse(body);
            products.push(product);
        });
        res.write("POST request successful, status 201");
    }


    else if (req.method === "PUT" && req.url === "/state") {
        res.write("PUT is trigger, update your data")
    }
    else if (req.method === "DELETE" && req.url === "/state") {
        res.write("DELETE is trigger, delete your data")
    }

    else {
        res.write("Not Found");
    }
    res.end();
}


