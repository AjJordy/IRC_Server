//Load TCP library
net = require('net');

//Load command handler
handler = require('../handler/handler.js');

//Load client entity
clientEntity = require('../entity/entity_client.js');

// Keep track of the chat clients
var clients = [];
var nicks = [];
var channels = [];
// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  //socket.name = socket.remoteAddress + ":" + socket.remotePort;
  //Create client object and assign socket and attributes
  var curr_Client = clientEntity.constructor(socket);
  curr_Client.nick = "Anonymous";

  // Put this new client in the list
  clients.push(curr_Client);

  // Send a nice welcome message and announce
  socket.write("Welcome " + curr_Client.nick + "\nHELP to know all commands.\n");
  handler.broadcast(curr_Client.nick + " joined the chat\n", curr_Client,clients);

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
      data.toString().trim().split('\n').forEach((function(comando){
          handler.analyze(comando, curr_Client, clients, channels);
          console.log(comando);
      }));

	});

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(curr_Client.socket), 1);
  });


}).listen(8081);

exports.clients = clients;

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 5000\n");
