// Same as req-rep/zmq-time-req.js but sends a request every 100ms.
const
  zmq = require('zeromq');
  requester = zmq.socket('req');

requester.on('message', (data) => {

  let request = JSON.parse(data);
  console.log(`Response from: ${request.pid}: ${new Date(request.timestamp)}`);
});

requester.connect('tcp://localhost:5433');

console.log('Sending request for time.');
setInterval(() => {
  requester.send(JSON.stringify({
    pid: process.pid
  }));
}, 100);
