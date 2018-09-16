const
  zmq = require('zeromq');
  subscriber = zmq.socket('sub');

subscriber.subscribe('');

// ZMQ either sends the whole message or nothing.
// You could still verify that the message is in fact a JSON though.
subscriber.on('message', (data) => {
    let msg = JSON.parse(data);
    console.log(`${msg.pid}: ${new Date(msg.timestamp)}`);
});

subscriber.connect('tcp://localhost:5432');