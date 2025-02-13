const http = require('http');

const server = http.createServer((req, res) => {
  // Simulate an asynchronous operation that might fail
  doAsyncOperation(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Success!');
  }, (error) => {
    // Handle the error, but don't close the response
    console.error('Async operation failed:', error);
  });
});

function doAsyncOperation(successCallback, errorCallback) {
  // Simulate an asynchronous operation that randomly fails
  setTimeout(() => {
    const random = Math.random();
    if (random < 0.5) {
      successCallback();
    } else {
      errorCallback(new Error('Async operation failed'));
    }
  }, 1000);
}

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});