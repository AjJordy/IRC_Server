// Load the TCP Library
net = require('net');

var nickname = "Annonymous";

// Send a message to all clients
exports.broadcast = function (message, sender, clients) {
  clients.forEach(function (client) {
    // Don't want to send it to sender
    if (client === sender) return;
      client.write(nickname+": "+message+"\n");
  });
  // Log it to the server output too
  process.stdout.write(message)
}

exports.analize = function (data,socket) {
  var message = String(data).trim();
  var args = message.split(" ");
  if (args[0] == "/HELP") help(socket);
  //else if (args[0] == "/NICK") nick(args,socket);
  //else if ( args[0] == "/USER") user(args); TODO: Pra que serviria ?
  //else if ( args[0] == "/JOIN") join(args); TODO: Pra que serviria ?
  else socket.write("Error: Non-existent command.\n");
}

// // Set the user's nickname
// function nick(args,socket){
//   nickname = args[1];
//   handler.broadcast(nickname + " joined the chat\n", socket);
//   socket.write("NICK command executed with sucess.\n");
// }

// List all commands available
function help(socket){
  socket.write("\nCommands:\n/NICK: To set your nickname.\n");
}

function user(socket) {
  //TODO
  socket.write("USER command executed with sucess.\n");
}

function join(socket) {
  //TODO
  socket.write("JOIN command executed with sucess.\n");
}
