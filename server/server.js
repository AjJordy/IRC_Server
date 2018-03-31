//Load TCP library
net = require('net');

//Load command handler
handler = require('../handler/handler.js');

//Load client entity
clientEntity = require('../model/clientEntity.js');

//Load channel entity
channelEntity = require('../model/channelEntity.js');



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
  socket.write("Welcome " + socket.name + "\n/HELP to know all commands.\n");
  handler.broadcast(socket.name + " joined the chat\n", curr_Client,'clients');

  // Handle incoming messages from clients.
  socket.on('data', function (data,curr_Client,clients) {
    var args = data.toString().trim().split(" ");
		if(args[0][0] === '/')
			handler.analize(data,curr_Client,clients);
		else
		{
			console.log(data.toString().trim());
			handler.broadcast(data.toString().trim(), curr_Client, clients);
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
