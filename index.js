let http = require('http');
let state = require('./state');
let users = state.users;
let products = state.products;

let server = http.createServer(messageReceived);
server.listen(8080);

function messageReceived(req, res) {
    res.writeHead( 200, {'Content-Type': 'text/plain'} );

    // get all users:
    if( req.method === 'GET' && req.url === '/users' ) {
        res.write( JSON.stringify(users) );
        res.end()
    }

    // get all products:
    else if( req.method === 'GET' && req.url === '/products' ) {
        res.write( JSON.stringify(products) );
        res.end();
    }

    // get specific user by id:
    else if( req.method === 'GET' && req.url.indexOf('/users') > -1 ) {
        let id = req.url.split('/');
        let user = users.find( u => u['_id'] === Number(id[2]) );
        if(!user) {
            res.write('User Not Found');
        }
        else {
            let userJSON = JSON.stringify(user);
            res.write(userJSON);
        }
        res.end()
    }

    // get specific product by id:
    else if( req.method === 'GET' && req.url.indexOf('/products/') > -1 ) {
        let id = req.url.split('/');
        let product = products.find( p => p['id'] === Number(id[2]) );
        if(!product) res.write('Product not found')
        else {
            let productJSON = JSON.stringify(product);
            res.write(productJSON);
        }
        res.end();
    }

    // post a new user:
    else if( req.method === 'POST' && req.url === '/users' ) {
        postUsers(req, res);
    }

    // post a new product:
    else if( req.method === 'POST' && req.url === '/products' ) {
        let body = [];
        req.on( 'data', (chunk) => {
            body.push(chunk);
        }).on( 'end', () => {
            body = Buffer.concat(body).toString();
            // parse JSON to create an object(s) from the body:
            let product = JSON.parse(body);
            
            // add _id property to new product:
            product.id = products.length + 1;
    
            // push new product to products array in state.js:
            products.push(product);
            
            // return the data we just updated to the client:
            res.write(JSON.stringify(product));
            res.end();
        })
    }

    // change a user:
    else if( req.method === 'PUT' && req.url.indexOf('/users/') > -1 ) {
        // putUsers();
        let body = [];
        let id = req.url.split('/');
        let user = users.find( u => u['_id'] === Number(id[2]) );
    
        req.on( 'data', (chunk) => {
            body.push(chunk);
        }).on( 'end', () => {
            body = Buffer.concat(body).toString();
            body = JSON.parse(body);
            user.occupation = body.occupation;
            res.write(JSON.stringify(user))
            res.end();
        })
    }

    // change a product:
    else if( req.method === 'PUT' && req.url.indexOf('/products/') > -1 ) {
        let body = [];
        let id = req.url.split('/');
        let product = products.find( u => u['id'] === Number(id[2]) );
    
        req.on( 'data', (chunk) => {
            body.push(chunk);
        }).on( 'end', () => {
            body = Buffer.concat(body).toString();
            body = JSON.parse(body);
            product.description = body.description;
            res.write(JSON.stringify(product))
            res.end();
        })
    }

    // delete a user:
    else if( req.method === 'DELETE' && req.url.indexOf('/users/') > -1 ) {
        let id = req.url.split('/');
        let user = users.find( u => u['_id'] === Number(id[2]) );
        if(!user) {
            res.write('User Not Found');
        }
        else {
            user.isActive = false;
            res.write(`Deleted user ${user._id}: ${user.name}`);
        }
        res.end()
    }

    else if( req.method === 'DELETE' && req.url.indexOf('/products/') > -1 ) {
        let id = req.url.split('/');
        let product = products.find( p => p['id'] === Number(id[2]) );
        if(!product) {
            res.write('Product not found');
        }
        else {
            product.isActive = false;
            res.write(`Deleted product #${product.id}: ${product.name}`);
        }
        res.end();
    }

    else {
        res.write('Not Found')
    }

    // res.end();
}

function postUsers(req, res) {
    // initialize array to store the body:
    let body = [];
    req.on( 'data', (chunk) => {
        body.push(chunk);
    }).on( 'end', () => {
        body = Buffer.concat(body).toString();
        // parse JSON to create an object(s) from the body:
        let user = JSON.parse(body);
        
        // add _id property to new user:
        user._id = users.length + 1;

        // push new user to users array in state.js:
        users.push(user);
        
        // return the data we just updated to the client:
        res.write(JSON.stringify(user));
        res.end();
    })
}

// function putUsers(req, res) {
//     let body = [];
//     let id = req.url.split('/');
//     let user = users.find( u => u['_id'] === Number(id[2]) );

//     req.on( 'data', (chunk) => {
//         body.push(chunk);
//     }).on( 'end', () => {
//         body = Buffer.concat(body).toString();
//         body = JSON.parse(body);
//         user.occupation = body.occupation;
//         res.end();
//     })
// }