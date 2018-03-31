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

  // Identify this client
  //socket.name = socket.remoteAddress + ":" + socket.remotePort;
  //Create client object and assign socket and attributes
	var curr_Client = clientEntity.constructor(socket);
  curr_Client.nick = "Anonymous";

  // Put this new client in the list
  clients.push(curr_Client);

  // Send a nice welcome message and announce
  socket.write("Welcome " + socket.name + "\nHELP to know all commands.\n");
  broadcast(socket.name + " joined the chat\n", curr_Client,clients);

  // Handle incoming messages from clients.
  socket.on('data', function (data,curr_Client,clients) {
    var args = data.toString().trim().split(" ");
		// Verify if is a command or a message
		if(handler.analize(data,curr_Client,clients)){
			console.log(data.toString().trim());
			broadcast(data.toString().trim(), curr_Client, clients);
		}
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the chat.\n", socket, clients);
  });


}).listen(5000);

function broadcast(message, sender, clients) {
  clients.forEach(function (client) {
    // Don't want to send it to sender
    if (client === sender) return;
    client.socket.write(message+"\n");
  });
  // Log it to the server output too
  process.stdout.write(message);
}

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 5000\n");
