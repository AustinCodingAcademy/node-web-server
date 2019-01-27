
var http = require('http');
let users = require("./state").users;
let products = require("./state").products;
let server = http.createServer(messageReceived);
server.listen(8080);

const postChucks = (req, res,urlselected) => {
    let body = [];
    req.on('data', (chunk) => {
    body.push(chunk);
    }).on('end', () => {
    body = Buffer.concat(body).toString();
    let user = JSON.parse(body);
    urlselected.push(user);
    });
}

function messageReceived(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  const firstTerm = req.url.split("/")[1];
  const secondTerm = req.url.split("/")[2];

  if(firstTerm=="favicon.ico"){
    res.end();
    return
  }

  if(req.method === "GET" && secondTerm){
    let urlselected = requestSelector(firstTerm)
    let user = urlselected.find(p=>p["id"] == secondTerm);
    if(!user){
      res.write("Not Found");
    }else{
      let usersJSON = JSON.stringify(user);
      res.write(usersJSON);
    }
    
  }else if(req.method === "GET"){
    let urlselected = requestSelector(firstTerm)
    let usersJSON = JSON.stringify(urlselected);
    res.write(usersJSON);
  }else if(req.method === "POST" && !secondTerm){
    let urlselected = requestSelector(firstTerm)
    postChucks(req, res,urlselected);
    res.write(JSON.stringify(urlselected));

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