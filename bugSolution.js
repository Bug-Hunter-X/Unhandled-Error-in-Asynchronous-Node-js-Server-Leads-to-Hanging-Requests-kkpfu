const http = require('http');

const server = http.createServer((req, res) => {
  // Use a try...catch block to handle errors and ensure the response is closed
  try {
    doAsyncOperation(() => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Success!');
    }, (error) => {
      // Handle the error and close the response
      console.error('Async operation failed:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Unexpected error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
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