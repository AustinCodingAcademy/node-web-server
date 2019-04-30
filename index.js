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

    // post a new user:
    else if( req.method === 'POST' && req.url === '/users' ) {
        postUsers(req, res);
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

    // else {
    //     res.write('Not Found')
    // }

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