var http = require('http');
let users = require("./state").users;
let products = require("./state").products;
let server = http.createServer(messageReceived);
server.listen(8080);

function messageReceived(req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});
const firstSlash = req.url.split("/")[1];
const secondSlash= req.url.split("/")[2];
if(req.method === "GET" && secondTSlash){
let urlselected = requestSelector(firstTSlash)
let user = urlselected.find(p=>p["id"] == secondSlash);
let usersJSON = JSON.stringify(user);
res.write(usersJSON);

}else if(req.method === "GET"){
let urlselected = requestSelector(firstSlash)
let usersJSON = JSON.stringify(urlselected);
res.write(usersJSON);

}else if(req.method === "POST" && req.url === "/users"){
let body = [];
req.on('data', (chunk) => {
body.push(chunk);
}).on('end', () => {
body = Buffer.concat(body).toString();
let user = JSON.parse(body);
users.push(user);
});
}

else{
res.write("Not Found");
}
res.end();
}


const requestSelector = (urlPath) => {
if(urlPath.toLowerCase()=="users"){
return users;
}else if (urlPath.toLowerCase()=="products"){
return products;
 }
}