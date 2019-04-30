let http = require('http');
let products = require('./state').products
let users = require('./state').users

let dataObjectArray = [{string: 'products', object: products},{string: 'users', object: users}]

let server=()=>{
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        let objectString = getDataObjectString(req.url)
        let object = getDataObject(objectString)
        if(req.method === "GET" && req.url.indexOf(`/${objectString}/`) > -1){
            let objectJSON = splitPath(req.url, object).objectJSON
            res.write(objectJSON);
        }
        else if(req.method === "POST" && req.url.indexOf(`/${objectString}/`) > -1){
            let productsJSON = splitPath(req.url, object)
            res.write("you wanted to make a product "+ productsJSON)
        }
        else if(req.method === "PUT" && req.url.indexOf(`/${objectString}/`) > -1){
            let objectName = splitPath(req.url, object).objectName
            res.write("you wanted to update product "+objectName)
        }
        else if(req.method === "DELETE" && req.url.indexOf(`/${objectString}/`) > -1){
            let objectName = splitPath(req.url, object).objectName
            res.write("Deleted "+objectName)
        }
        else{
        res.write("Not Found");
        }
        res.end();
    }).listen(8080);
}

let getDataObjectString =(url)=>{
    url = url.split("/")
    return url[1]
}

let getDataObject =(string)=>{
    string = dataObjectArray.filter(object=> object.string === string)
    string = string.length === 0 ? []: string[0].object 
    return string
}

let productsById =(id, object)=>{
    let array = []
    for(let i = 0; i<object.length; i++){
        if(object[i].id === id){
            array.push(object[i])
        }
    }
    return array
}

let splitPath=(string, object)=>{
    let id = string.split("/"); 
    id = parseFloat(id[2])
    try{
        let objectJSON = JSON.stringify(productsById(id, object))
        let objectName = JSON.stringify(productsById(id, object[id-1].name))
        return {objectJSON, objectName}
    }catch(err)
    {
        let objectJSON = "No Result"
        let objectName = "No Result"
        return {objectJSON, objectName}
    }
}

server()

//this is homework make this work for users and products

