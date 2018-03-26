// Load the TCP Library
net = require('net');

// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function (socket) {

  var nickname = "Annonymous";

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort

  // Put this new client in the list
  clients.push(socket);

  // Send a nice welcome message and announce
  socket.write("Welcome!\n/HELP to know all commands.\n");

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    //broadcast(socket.name + "> " + data, socket);
    analize(data);
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the chat.\n");
  });

  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(nickname+": "+message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }

  // Analize if is a command or a message
  function analize(data){
    var message = String(data).trim();
    var args = message.split(" ");
    if ( args[0] == "/NICK") nick(args);
    else if (args[0] == "/HELP") help();
    //else if ( args[0] == "/USER") user(args); TODO: Pra que serviria ?
    //else if ( args[0] == "/JOIN") join(args); TODO: Pra que serviria ?
    else broadcast(data);
  }

  // Set the user's nickname
  function nick(args){
    nickname = args[1];
    broadcast(nickname + " joined the chat\n", socket);
    socket.write("NICK command executed with sucess.\n");
  }

  // List all commands available
  function help(){
    socket.write("Commands:\n/NICK: To set your nickname.\n");
  }

}).listen(5000);

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 5000\n");
