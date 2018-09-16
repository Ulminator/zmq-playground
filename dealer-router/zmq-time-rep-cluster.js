const
  cluster = require('cluster'),
  zmq = require('zeromq'),
  os = require('os'),

  workerCount = os.cpus().length,

  externalEndpoint = 'tcp://127.0.0.1:5433',
  workerEndpoint = 'ipc://rep-cluster.ipc';

if (cluster.isMaster) {
  
  let
    router = zmq.socket('router').bind(externalEndpoint), 
    dealer = zmq.socket('dealer').bind(workerEndpoint); 
  
  router.on('message', function() {
    let frames = Array.prototype.slice.call(arguments);
    dealer.send(frames);
  });
  
  dealer.on('message', function() {
    let frames = Array.prototype.slice.call(arguments);
    router.send(frames);
  });
  
  cluster.on('online', function(worker) {
    console.log(`Worker ${worker.process.pid} is online.`);
  });
  
  for (let i = 0; i < workerCount; i++) {
    cluster.fork();
  }
  
} else {
  
  let responder = zmq.socket('rep').connect(workerEndpoint);
  
  responder.on('message', function(data) {
    
    let request = JSON.parse(data);
    console.log(`${process.pid} received request from: ${request.pid}`);
    
    responder.send(JSON.stringify({
      pid: process.pid,
      timestamp: Date.now()
    }));
    
  });
  
}
