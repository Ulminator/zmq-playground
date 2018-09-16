// Push a message, will wait until it can be pulled (can lose messages with pubsub)
const
  zmq = require('zeromq'),
  pusher = zmq.socket('push');

let jobCount = 0;

setInterval(() => {
  jobCount += 1;
  let msg = {
    pid: process.pid,
    job: jobCount
  };
  pusher.send(JSON.stringify(msg));
}, 1000);

pusher.bind('tcp://*:5432', (err) => {
  if (err) console.log(err);
  else console.log('Listening for zmq pullers...');
});
