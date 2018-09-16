const
  cluster = require('cluster'),
  zmq = require('zeromq'),
  os = require('os'),

  workerCount = os.cpus().length;

if (cluster.isMaster) {
  
  cluster.on('online', function(worker) {
    console.log(`Worker ${worker.process.pid} is online.`);
  });
  
  for (let i = 0; i < workerCount; i++) {
    cluster.fork();
  }
  
} else {

  let puller = zmq.socket('pull');

  // First joiner problem - Whatever worker spawns first, it grabs all the messages.
  // Have workers announce that they are available, have pusher only send when there are X number or workers available.
  puller.on('message', (data) => {
    let msg = JSON.parse(data);
    console.log(`${msg.pid}: Job received - ${msg.job} (${process.pid})`);
  });
  
  puller.connect('tcp://localhost:5432');
  
}
