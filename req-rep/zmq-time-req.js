const
  zmq = require('zeromq');
  requester = zmq.socket('req');

requester.on('message', (data) => {

  let request = JSON.parse(data);
  console.log(`Response from: ${request.pid}: ${new Date(request.timestamp)}`);
});

requester.connect('tcp://localhost:5433');

console.log('Sending request for time.');
requester.send(JSON.stringify({
  pid: process.pid
}));
