let http = require('http');
let state = require('./state');
let users = state.users;
let products = state.products;

let server = http.createServer(messageReceived);
server.listen(8080);

function messageReceived(req, res) {
    res.writeHead( 200, {'Content-Type': 'text/plain'} );

    if( req.method === 'GET' && req.url === '/users' ) {
        res.write( JSON.stringify(users) );
    }

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
    }

    else {
        res.write('Not Found')
    }

    if( req.method === 'POST' && req.url === '/users' ) {

    }
    
    res.end();
}
