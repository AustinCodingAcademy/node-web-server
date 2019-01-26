var http = require('http');
var users = require("./state.js").users;
var products = require("./state.js").products;


var server = http.createServer(messageReceived);

server.listen(8080);



function messageReceived(req, res) {
    let toDisplay = "Complete";

    if (req.method === "GET") {
        var idToFetchRegEx = /\d+/g;
        let idToFetch = idToFetchRegEx.exec(req.url);


        if (req.url.toLowerCase().includes("/users")) {

            if (idToFetch && idToFetch.length > 0) {
                toDisplay = JSON.stringify(getRecordById(idToFetch.join(), users));
            }
            else {
                toDisplay = JSON.stringify(users);
            }
        }
        else if (req.url.toLowerCase().includes("/products")) {

            if (idToFetch && idToFetch.length > 0) {
                toDisplay = JSON.stringify(getRecordById(idToFetch.join(), products));
            }
            else {
                toDisplay = JSON.stringify(products);
            }
        }
        else {
            toDisplay = "What???";
        }
    }
    else if (req.method == "POST") {
        let body = [];

        if (req.url == "/users") {
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                let user = JSON.parse(body);
                users.push(user);
            });
        }
        else if (req.url == "/products") {
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                let product = JSON.parse(body);
                products.push(product);
            });
        }
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(toDisplay);
    res.end();
}



function getRecordById(id, myArray) {
    let result = myArray.find( element => element._id == id );
    
    if (result)
        return result;
    else
        return "Element Not Found"
}

