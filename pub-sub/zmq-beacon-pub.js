const
  zmq = require('zeromq');
  publisher = zmq.socket('pub');

setInterval(() => {
  const msg = {
    pid: process.pid,
    timestamp: Date.now()
  };
  publisher.send(JSON.stringify(msg));
}, 1000);

publisher.bind('tcp://*:5432', (err) => {
  if (err) console.log(err);
  else console.log('Listening for zmq subscribers');
});
