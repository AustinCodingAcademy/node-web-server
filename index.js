let http = require('http');
let products = require('./state').products
let users = require('./state').users

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    if(req.method === "GET" && req.url.indexOf("/products/") > -1){
        let productsJSON = splitPath(req.url).productsJSON
        res.write(productsJSON);
    }
    else if(req.method === "POST" && req.url.indexOf("/products/") > -1){
        let productsJSON = splitPath(req.url)
        res.write("you wanted to make a product")
    }
    else if(req.method === "PUT" && req.url.indexOf("/products/") > -1){
        let productName = splitPath(req.url).productName
        res.write("you wanted to update product "+productName)
    }
    else if(req.method === "DELETE" && req.url.indexOf("/products/") > -1){
        let productName = splitPath(req.url).productName
        res.write("you wanted to delete product "+productName)
    }
    else{
    res.write("Not Found");
    }
    res.end();
}).listen(8080);

let productsById =(id)=>{
    let array = []
    for(let i = 0; i<products.length; i++){
        if(products[i].id === id){
            array.push(products[i])
        }
    }
    return array
}

let splitPath=(string)=>{
    let id = string.split("/"); 
    id = parseFloat(id[2])
    let productsJSON = JSON.stringify(productsById(id))
    let productName = JSON.stringify(productsById(id)[0].name)
    return {productsJSON, productName}
}

let handleDelete=()=>{

}
//this is homework make this work for users and products

