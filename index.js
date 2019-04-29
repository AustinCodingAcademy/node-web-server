var http = require('http');
let state = require("./state.js")

let users = state.users
let products = state.products

let server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    if (req.method === "GET" && req.url === "/users") {
        let usersJSON = JSON.stringify(users)
        res.write(usersJSON)
    }
    if (req.method === "GET" && req.url.indexOf("/users/") > -1) {
        let id = req.url.split("/")
        let user  = users.find(p=>p["_id"] == id[2]);
        let userJSON = JSON.stringify(user)
        res.write(userJSON)
    }
    if (req.method === "POST" && req.url === "/users") {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let user = JSON.parse(body);
            user._id = users[users.length - 1]._id + 1
            users.push(user);
            user = JSON.stringify(user)
            res.write(user)
        })
    }
    if (req.method === "PUT" && req.url.indexOf("/users/") > -1) {
        let body = [];
        let id = req.url.split("/")
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let user = JSON.parse(body);
            let index = users.indexOf(users.find(p=>p["_id"] == id[2]))
            users[index] = user
        });
    }
    if (req.method === "DELETE" && req.url.indexOf("/users/") > -1) {
        let id = req.url.split("/")
        let user  = users.find(p=>p["_id"] == id[2]);
        user.isActive = false
        //let index = users.indexOf(user)
        //users.splice(index, 1)
        res.write("deleted")
        };

    if (req.method === "GET" && req.url === "/products") {
        let productsJSON = JSON.stringify(products)
        res.write(productsJSON)
    }
    if (req.method === "GET" && req.url.indexOf("/products/") > -1) {
        let id = req.url.split("/")
        let product  = products.find(p=>p["_id"] == id[2]);
        let productJSON = JSON.stringify(product)
        res.write(productJSON)
    }
    if (req.method === "POST" && req.url === "/products") {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let product = JSON.parse(body);
            let lastIndex = products.length - 1
            product._id = products[lastIndex]._id + 1
            products.push(product);
        })
    }
    if (req.method === "PUT" && req.url.indexOf("/products/") > -1) {
        let body = [];
        let id = req.url.split("/")
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let product = JSON.parse(body);
            let index = products.indexOf(products.find(p=>p["_id"] == id[2]))
            products[index] = product
        });
    }
    if (req.method === "DELETE" && req.url.indexOf("/products/") > -1) {
        let id = req.url.split("/")
        let product  = products.find(p=>p["_id"] == id[2]);
        product.isActive = false
        //let index = products.indexOf(product)
        //products.splice(index, 1)
        res.write("deleted")
        };        

res.end();
});

server.listen(8080)