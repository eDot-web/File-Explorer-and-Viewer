const http = require('http');

const respond = require('./lib/respond');

const PORT = process.env.port || 3000;

// Create Server:
const server = http.createServer(respond);

server.listen(PORT, ()=>{
   console.log(`Server started at port ${PORT}`);
});

