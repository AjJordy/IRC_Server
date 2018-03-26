// Load the TCP Library
net = require('net');



function analize(args) {
  if (args[0] == "NICK") nick(args);
  else if (args[0] == "USER") user(args);
  else if (args[0] == "JOIN") join(args);
  else socket.write("ERRO: Non-existent command");
}

function user(args) {
  //TODO
  socket.write("USER command executed with sucess.\n");
}


function nick(args) {
  //TODO
  socket.write("NICK command executed with sucess.\n");
}

function join(args) {
  //TODO
  socket.write("JOIN command executed with sucess.\n");
}