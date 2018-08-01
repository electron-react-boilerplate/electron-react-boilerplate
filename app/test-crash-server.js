const http = require('http');

const port = 4000;

const requestHandler = (request, response) => {
  console.log('incoming request');
  console.log(request.url);
  console.log(request);
  response.end('Hello Node.js Server!');
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
