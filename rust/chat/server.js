const http = require('http');
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

const RED='\033[0;31m';
const GREEN = '\033[0;32m';
const NC='\033[0m';

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        console.log('connected!');
        myEmitter.on('post', (data) => {
            res.write(`${RED} ==>${NC}${GREEN} ${data}${NC}\n`);
        });
    } else if (req.method === 'POST') {
        let buffer = Buffer.from('');
        req.on('data', (d) => {
            console.log('comming data => %s', d);
            buffer = Buffer.concat([buffer, d]);
        });
        req.on('end', () => {
            myEmitter.emit('post', buffer);
            res.statusCode = 201;
            res.end();
        });
    } else {
        res.end();
    }
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.on('error', (err) => {
    console.error(err);
});
server.listen(12345);
