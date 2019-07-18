var http = require('http')
let state = require('./state');
let users = state.users
let products = state.products


//create server and pass function you want to run when message is recived
let server = http.createServer(messageRecieved);

//tell server to listen on port 8080
server.listen(8080);

//Whenver message is recieved this function gets called
function messageRecieved(req,res) {
    res.writeHead(200,{'Content-Type' : 'text/plain'});
    //write if statements to determine what happens with different methods/urls
    if (req.method === "GET" && req.url === "/users") {
        //turn array of objects into string because you have to return a string in node
        let usersJSON = JSON.stringify(users);
        //respond with the stringifed version of users
        res.write(usersJSON);
        res.end()
    } 
    else if(req.method === "GET" && req.url.indexOf("/users/") > -1){
        let id = req.url.split("/")
        let user = users.find(user => user["_id"] == id[2]);
        let userJSON = JSON.stringify(user);
        res.write(userJSON)
        res.end();
    } 
    else if(req.method === "POST" && req.url === "/users"){
        let body = [];
        req.on('data',(chunk) =>{
            body.push(chunk)
        }).on('end',() =>{
            body = Buffer.concat(body).toString();
            let user = JSON.parse(body);
            user._id = users.length + 1;
            users.push(user);
            user = JSON.stringify(user);
            res.write(user);
            res.end()
        });
    } 
    else if(req.method === "PUT" && req.url.indexOf("/users/") > -1){
        let id = req.url.split('/');
        req.on('data',(chunk) =>{
            body.push(chunk)
        }).on('end',() =>{
            body = Buffer.concat.toString();
            let user = users.find(user => user["_id"] == id[2]);
            users[index] = user
            res.write(JSON.stringify(user))
            res.end()
        });
    } 
    else if(req.method === "DELETE" && req.url.indexOf("/users") > -1){
        let id = req.url.split("/");
        let user = users.find(user => user["_id"] == id[2]);
        user.isActive = false;
        res.write('deleted')
        res.end();
    } 
    else if (req.method === "GET" && req.url === "/products"){
        let productsJSON = JSON.stringify(products);
        res.write(productsJSON)
        res.end()
    }
    else if(req.method === "GET" && req.url.indexOf("/products/") > -1){
        let id = req.url.split("/")
        let product = products.find(product => product["_id"] == id[2]);
        let productJSON = JSON.stringify(product);
        res.write(productJSON)
        res.end();
    }
    else if(req.method === "POST" && req.url === "/products"){
        let body = [];
        req.on('data',(chunk) =>{
            body.push(chunk)
        }).on('end',() =>{
            body = Buffer.concat(body).toString();
            let product = JSON.parse(body);
            product._id = products.length + 1;
            products.push(product);
            user = JSON.stringify([product]);
            res.write(product);
            res.end()
        });
    } 
    else if(req.method === "PUT" && req.url.indexOf("/products/") > -1){
        let id = req.url.split('/');
        req.on('data',(chunk) =>{
            body.push(chunk)
        }).on('end',() =>{
            body = Buffer.concat.toString();
            let product = products.find(product => product["_id"] == id[2]);
            products[index] = product
            res.write(JSON.stringify(product))
            res.end()
        });
    }
    else if(req.method === "DELETE" && req.url.indexOf("/products") > -1){
        let id = req.url.split("/");
        let product = products.find(product => product["_id"] == id[2]);
        product.isActive = false;
        res.write('deleted')
        res.end();
    } 

    else {
        res.write('not found')
    }
}
