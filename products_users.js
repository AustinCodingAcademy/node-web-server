'use strict';

const http= require('http');
let products = require('./state').products;
let users = require('./state').users;
let arr = null;
let index = null;

// For path variables. 
const determineArr = (req) => {
    let reqIdentify = req.url.split('/');

    if (reqIdentify[1] === 'users') {
        arr = users;
    } else if (reqIdentify[1] === 'products') {
        arr = products
    } else {
        arr = [];
    }

    
    if(reqIdentify[2]) {
        index = reqIdentify[2]
    } else {
        index = null;
    }
    
}

const reqRes = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // get method with no id
    if (req.method === 'GET' && index === null && arr.length > 0 ) {
        let listJSON = JSON.stringify(arr);
        res.write(listJSON);
        arr = null;
    // get method with id. 
    } else if (req.method === 'GET' && index !== null) {
        const findId = arr.find(productUser => {
            return productUser['id'] == index;
        }) 
        res.write(JSON.stringify(findId));
        arr = null;
    // post method
    } else if (req.method === 'POST' && arr.length > 0) {
        let body = [];
        req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                let productUser = JSON.parse(body);
                if (products[0].name === arr[0].name) {
                    products.push(productUser);
                    const addedProducts = products[products.length -1];
                    addedProducts.id = products.length;
                } else {
                    users.push(productUser);
                    const addedUser = users[users.length -1];
                    addedUser.id = users.length;
                }
                arr = null;
            });  
        // put method   
    }  else if (req.method === 'PUT' && arr.length > 0 && index !== null) {
         let body = [];
         req.on('data', (chunk) => {
            body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                let input = JSON.parse(body);
                if (products[0].name === arr[0].name) {
                    const findId = products.find(p => {
                        return p['id'] == index;
                    }) 
                    const getProductKeys = Object.keys(findId);
                    const getInputKeys = Object.keys(input); 
                    getProductKeys.forEach(key => {
                        if(getInputKeys.includes(key)) {
                            findId[key] = input[key]
                        }
                    })
                } else {
                    const findId = users.find(p => {
                        return p['id'] == index;
                    }) 
                    const getUsersKeys = Object.keys(findId);
                    const getInputKeys = Object.keys(input); 
                    getUsersKeys.forEach(key => {
                        if(getInputKeys.includes(key)) {
                            findId[key] = input[key]
                        }
                    }) 
                }
            arr = null;
        })
        // delete method
    } else if (req.method === 'DELETE' && arr.length > 0 && index !== null) {
        if (products[0].name === arr[0].name) {
            const findId = products.find(p => {
                return p['id'] == index;
            })
            findId.isActive = 'Off'
            // couldn't use the send message to send back the word "delete"
            res.write('Deleted');
        } else {
            const findId = users.find(p => {
                return p['id'] == index;
            })
            findId.isActive = 'Off'
            // couldn't use the send message to send back the word "delete"
            res.write('Deleted');
        }
        arr = null;
    } else {
        res.write('Not Found');
        arr = null;
    }
    
    res.end();
}

let getMessage = (req, res) => {
    determineArr(req);
    if (arr !== null) {
        reqRes(req,res)
    };
    
    // get method with a response of products array; 
}

let server = http.createServer(getMessage);
server.listen(8080);

