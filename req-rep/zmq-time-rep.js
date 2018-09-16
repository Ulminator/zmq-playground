const
  zmq = require('zeromq');
  responder = zmq.socket('rep'); //replier

responder.on('message', (data) => {

  let request = JSON.parse(data);
  console.log(`Received request from: ${request.pid}`);

  responder.send(JSON.stringify({
    pid: process.pid,
    timestamp: Date.now()
  }));

});

responder.bind('tcp://127.0.0.1:5433', (err) => {
  if (err) console.log(err);
  else console.log('Listening for zmq requesters...');
})
