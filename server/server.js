//Load TCP library
net = require('net');

//Load command handler
handler = require('../handler/handler.js');

//Load client entity
clientEntity = require('../entity/entity_client.js');

// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function (socket) {

  var client = clientEntity.constructor(socket);

  //Push new client into the list
  clients.push(client);

  // Send a nice welcome message and announce
  client.socket.write("Welcome " + client.nick + "\n/HELP to know all commands.\n");
  handler.broadcast(client.nick + " joined the chat\n", client,clients);

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    var args = data.toString().trim().split(" ");
		if(args[0][0] === '/')
			handler.analize(args, client, clients);
		else
		{
			handler.broadcast(data.toString().trim(), client, clients);
		}
    
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(client.socket), 1);
    handler.broadcast(client.nick + " left the chat.\n", client, clients);
  });

}).listen(5000);

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 5000\n");
