# Installing ZMQ on MacOS

Need a compatible version of Node.js
------------------------------------
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

nvm i 9.11.1
nvm use 9.11.1

Brew Installation
-----------------
brew install zmq
brew install pkg-config

npm i zeromq --zmq-external