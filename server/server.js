//Load TCP library
net = require('net');

//Load command handler
handler = require('../handler/handler.js');


// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort

  // Put this new client in the list
  clients.push(socket);

  // Send a nice welcome message and announce
  socket.write("Welcome " + socket.name + "\n/HELP to know all commands.\n");
  handler.broadcast(socket.name + " joined the chat\n", socket,clients);

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    var args = data.toString().trim().split(" ");
		if(args[0][0] === '/')
			handler.analize(data,socket);
		else
		{
			console.log(data.toString().trim());
			handler.broadcast(data.toString().trim(), socket, clients);
		}

  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    handler.broadcast(socket.name + " left the chat.\n", socket, clients);
  });


}).listen(5000);

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 5000\n");
