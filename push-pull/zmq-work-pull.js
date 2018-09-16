const
  zmq = require('zeromq');
  puller = zmq.socket('pull');

puller.on('message', (data) => {
  let msg = JSON.parse(data);
  console.log(`${msg.pid}: Job received - ${msg.job}`);
});

puller.connect('tcp://localhost:5432');