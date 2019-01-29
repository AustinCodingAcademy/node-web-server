
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
  user.id = urlselected[urlselected.length-1].id+1
  res.end(JSON.stringify(user))
  urlselected.push(user);
  });
}

const putChucks = (req, res,urlselected,slicePosition) => {
  let body = [];
  req.on('data', (chunk) => {
  body.push(chunk);
  }).on('end', () => {
  body = Buffer.concat(body).toString();
  let user = JSON.parse(body);
  user.id = urlselected[slicePosition].id
  res.end(JSON.stringify(user))
  urlselected[slicePosition]=(user);
  });
}

const deleteChucks = (req, res,urlselected,slicePosition) => {
  res.end("Deleted")
  urlselected.splice(slicePosition,1)
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
    // let user = urlselected.find(p=>p["id"] == secondTerm);
    let user = null;
    if(secondTerm){
      // keeping this if statement in case path changes to what I think
      // the assigment is asking
      user = urlselected.find(p=>p["id"] == secondTerm);
    }else{
      user = urlselected[Number(secondTerm[1])-1];
    }
    if(!user){
      res.end("Not Found");
    }else{
      let usersJSON = JSON.stringify(user);
      res.end(usersJSON);
    }
    
  }else if(req.method === "GET"){
    let urlselected = requestSelector(firstTerm)
    let usersJSON = JSON.stringify(urlselected);
    res.end(usersJSON);
  }else if(req.method === "POST" && !secondTerm){
    let urlselected = requestSelector(firstTerm)
    postChucks(req, res,urlselected);
    // takes in a request, a response and an array to push the chunck to
  }else if(req.method === "PUT" && secondTerm){
    let urlselected = requestSelector(firstTerm)
    const slicePosition = urlselected.findIndex( (item,index) => {
      return item.id == secondTerm;
    })
    putChucks(req, res,urlselected,Number(slicePosition))

  }else if(req.method === "DELETE" && secondTerm){
    let urlselected = requestSelector(firstTerm)
    const slicePosition = urlselected.findIndex( (item,index) => {
      return item.id == secondTerm;
    })

    deleteChucks(req, res,urlselected,Number(slicePosition))

  }

  else{
   res.end("Not Found");
  }

}


const requestSelector = (urlPath) => {
  if(urlPath.toLowerCase()=="users"){
    return users;
  }else if (urlPath.toLowerCase()=="products"){
    return products;
  }
}