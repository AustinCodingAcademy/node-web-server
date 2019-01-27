var http = require('http');
var users = require("./state.js").users;
var products = require("./state.js").products;


var server = http.createServer(messageReceived);

server.listen(8080);



function messageReceived(req, res) {
    let toDisplay = "Complete";

    if (req.method === "GET") {
        toDisplay = getRecordsToDisplayOnGetRequest(req.url);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(toDisplay);
        res.end();
    }
    else if (req.method == "PUT") {
        toDisplay = markElementAsModifiedById(req.url);
        let httpVerb = 400;
        
        if (toDisplay) {
            httpVerb = 204;
        }
        res.writeHead(httpVerb, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(toDisplay));
        res.end();
    }
    else if (req.method == "POST") {
        let body = [];

        if (req.url == "/users" || req.url == "/products") {
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();

                let element = JSON.parse(body);

                if (req.url == "/users") {
                    element._id = users.length + 1;
                    users.push(element);
                }
                else {
                    element._id = products.length + 1;
                    products.push(element);
                } 
 
                toDisplay = JSON.stringify(element);
                
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(toDisplay);
                res.end();
            });
        }
        else {
            toDisplay = JSON.stringify("ERROR: Not a valid element");
            
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(toDisplay);
            res.end();
        }
    }
    else if (req.method == "DELETE") {
        toDisplay = markElementAsDeletedById(req.url);
        let httpVerb = 400;
        
        if (toDisplay) {
            httpVerb = 200;
            toDisplay = "deleted";
        }
        res.writeHead(httpVerb, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(toDisplay));
        res.end();
    }
    else {
        toDisplay = "METHOD NOT ALLOWED";
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(toDisplay);
        res.end();
    }
}


function markElementAsDeletedById(url) {
    let success = true;
    let elements = getElementsFromRequest(url);

    //A single element got returned
    if (elements && elements.length == null) {
        elements.isActive = false;
    }
    //Either no element or all elements got returned
    else {
        success = false;
    }
    return success;
}


function markElementAsModifiedById(url) {
    let success = true;
    let elements = getElementsFromRequest(url);

    //A single element got returned
    if (elements && elements.length == null) {
        elements._modified = true;
    }
    //Either no element or all elements got returned
    else {
        success = false;
    }
    return success;
}

function getElementsFromRequest(url) {
    let idToFetchRegEx = /\d+/g;
    let idToFetch = idToFetchRegEx.exec(url);

    let toReturn;

    if (url.toLowerCase().includes("/users")) {

        if (idToFetch && idToFetch.length > 0) {
            toReturn = getRecordById(idToFetch.join(), users);
        }
        else {
            toReturn = users;
        }
    }
    else if (url.toLowerCase().includes("/products")) {

        if (idToFetch && idToFetch.length > 0) {
            toReturn = getRecordById(idToFetch.join(), products);
        }
        else {
            toReturn = products;
        }
    }
    else {
        toReturn = null;
    }
    return toReturn;
}


function getRecordsToDisplayOnGetRequest(url) {
    return JSON.stringify(getElementsFromRequest(url));
}

function getRecordById(id, myArray) {
    let result = myArray.find( element => element._id == id );
    
    if (result)
        return result;
    else
        return null;
}

