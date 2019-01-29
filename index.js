//my ip 192.168.36.87.
//192.168.1.146.
var http = require('http');
let users = require("./state").users;
let products = require("./state").products;
let server = http.createServer(messageReceived);
server.listen(8080);


function messageReceived(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    //1
    if(req.method === "GET" && req.url === "/users"){
      getUsers(req, res);
    }
    //2
    else if(req.method === "GET" && req.url.indexOf("/users/") > -1){
        let id = req.url.split("/");
        let user = users.find(p=>p["_id"] == id[2]);
        //9
        if(!user){
            let userId = id[2].split('');
            if(userId[0] == ':'){
                let specificUser = users.find(p=>p["_id"] == userId[1]);
                let specificUserJSON = JSON.stringify(specificUser);
                res.write(specificUserJSON);
            }
        }else {
            let usersJSON = JSON.stringify(user);
            res.write(usersJSON);
        }
    }
    //3
    else if(req.method === "POST" && req.url === "/users"){
        let body = [];
        req.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
          let user = JSON.parse(body);
          //7
          user._id = users.length + 1;
          users.push(user);
        });
    }
    //4 - not right :(
    else if(req.method === "PUT" && req.url.indexOf("/users/") > -1){
        let id = req.url.split("/");
        let user = users.find(p=>p["_id"] == id[2]);
        let body = [];
        req.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
          body = JSON.parse(body);
          user.newThing = body;//use res.write??
        });
    }
    //5 also not working properly :(
    else if(req.method === "DELETE" && req.url.indexOf("/users/") > -1){
        let id = req.url.split("/");
        console.log(id[2])
        let user = users.find(u=>u["_id"] == id[2]);
        let index = users.indexOf(u=>u[_id] == user[_id])
        console.log(index);
        users.splice(Number(index), 1);
        res.write('Deleted')
    }
    
    // else if(req.method === "GET" && req.url === "/products"){
    //   getProducts(req, res);
    // }
    // else if(req.method === "PUT" && req.url.indexOf("/products/") > -1){
    //     let id = req.url.split("/");
    //     let product = products.find(p=>p["id"] == id[2]);
    //     let productsJSON = JSON.stringify(product);
    //     res.write(productsJSON);
    // }
    else{
     res.write("Not Found");
    }
    res.end();
}

function getUsers(req, res){
    let usersJSON = JSON.stringify(users);
    res.write(usersJSON);
}
function getProducts(req, res){
    let productsJSON = JSON.stringify(products);
    res.write(productsJSON);
}
