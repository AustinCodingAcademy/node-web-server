'use strict';

const http= require('http');
let products = require('./state').products;
let users = require('./state').users;

let getMessage = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // get method with a response of products array
    if (req.method === 'GET' && req.url === '/products') {
        let productsJSON = JSON.stringify(products);
        res.write(productsJSON);
    // satifies second requirement of part 1. 
    } else if (req.method === 'GET' && req.url.indexOf('/products/') !== -1) {
        const splitPath = req.url.split('/');
        const findId = products.find(product => {
            return product['id'] == splitPath[splitPath.length -1];
        }) 
        let productsJSON = JSON.stringify(findId);
        res.write(productsJSON);
    } else if (req.method === 'POST' && req.url === '/products') {
        let body = [];
        req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                let product = JSON.parse(body);
                products.push(product);
                const addedProducts = products[products.length -1];
                addedProducts.id = products.length;
            });        
    }  else if (req.method === 'PUT' && req.url.indexOf('/products/') !== -1) {
         let body = [];
         const splitPath = req.url.split('/');
         req.on('data', (chunk) => {
            body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                let input = JSON.parse(body);
                const findId = products.find(p => {
                    return p['id'] == splitPath[splitPath.length -1];
                }) 
                const getProductKeys = Object.keys(findId);
                const getInputKeys = Object.keys(input); 
                getProductKeys.forEach((key,index) => {
                    if(getInputKeys.includes(key)) {
                        findId[key] = input[key]
                    }
                })
        })
    } else if (req.method === 'DELETE' && req.url.indexOf('/products/') !== -1) {
         const splitPath = req.url.split('/');
         const findId = products.find(p => {
            return p['id'] == splitPath[splitPath.length -1];
        })
        findId.isActive = 'Off'
        // couldn't use the send message to send back the word "delete"
        res.write('Deleted');

    } else {
        res.write('Not Found');
    }

    res.end();
}

let server = http.createServer(getMessage);
server.listen(8080);

