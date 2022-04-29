const http = require('http');
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

const RED='\033[0;31m';
const GREEN = '\033[0;32m';
const NC='\033[0m';

const EVENT = 'POST_DATA';

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') {
        console.log('connected!');
        myEmitter.on(EVENT, (data) => {
          reText = `${RED} ==>${NC}${GREEN} ${data}${NC}\n`;
          console.log('Fired: ', reText);
          res.write(reText);
        });
    } else if (req.method === 'POST') {
        let buffer = Buffer.from('');
        req.on('data', (d) => {
            console.log('comming data => %s', d);
            buffer = Buffer.concat([buffer, d]);
        });
        req.on('end', () => {
          console.log("emit event: ", buffer);
          myEmitter.emit(EVENT, buffer);
          res.statusCode = 201;
          res.end();
        });
    } else {
        console.log("Not support!!!");
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
