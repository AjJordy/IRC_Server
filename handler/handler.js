// Load the TCP Library
net = require('net');

var nickname = "Anonymous";

// Send a message to all clients
exports.broadcast = function (message, sender, clients) {
  clients.forEach(function (client) {
    // Don't want to send it to sender
    if (client === sender) return;
    client.write(nickname+": "+message+"\n");
  });
  // Log it to the server output too
  process.stdout.write(message);
}

exports.analize = function (data,socket) {
  var message = String(data).trim();
  var args = message.split(" ");
  if (args[0] == "/HELP") help(socket);
  else if (args[0] == "/NICK") nick(args,socket);
  else if (args[0] == "/PASS") pass(args,socket);
  else if ( args[0] == "/USER") user(args,socket);
  else if ( args[0] == "/OPER") oper(args,socket);
  else if ( args[0] == "/MODE") mode(args,socket);
  else if ( args[0] == "/SERVICE") service(args,socket);
  else if ( args[0] == "/QUIT") quit(args,socket);
  else if ( args[0] == "/JOIN") join(args,socket);
  else if ( args[0] == "/PART") part(args,socket);
  else if ( args[0] == "/TOPIC") topic(args,socket);
  else if ( args[0] == "/NAMES") names(args,socket);
  else if ( args[0] == "/LIST") list(args,socket);
  else if ( args[0] == "/INVITE") invite(args,socket);
  else if ( args[0] == "/KICK") kick(args,socket,target);
  else if ( args[0] == "/PRIVMSG") privmsg(target,args,socket);
  else socket.write("Error: Non-existent command.\n");
}

// List all commands available
function help(socket){
  socket.write("\nCommands of connection registration:\n"+
  "/NICK: To set your nickname.\n"+
  "/PASS: To set your password.\n"+
  "/USER: used at the beginning of connection to specify the username.\n"+
  "/OPER: To obtain operator privileges.\n"+
  "/MODE: The available modes are as follows:\n" +
  "\ta - user is flagged as away;\n"+
  "\ti - marks a users as invisible;\n"+
  "\tw - user receives wallops;\n"+
  "\tr - restricted user connection;\n"+
  "\to - operator flag;\n"+
  "\tO - local operator flag;\n"+
  "\ts - marks a user for receipt of server notices.\n"+
  "/SERVICE: To register a new service.\n"+
  "/QUIT: To quit of the chat.\n\n"+
  "Commands of Channel operations:\n\n"+
  "/JOIN: To enter in a channel.\n"+
  "/PART: causes the user sending the message to be removed from the list of active members\n"+
  "/TOPIC: Is used to change or view the topic of a channel.\n"+
  "/NAMES: a user can list all nicknames that are visible to him.\n"+
  "/LIST: The list command is used to list channels and their topics.\n"+
  "/INVITE: Is used to invite a user to a channel.\n"+
  "/KICK: Is used to request the forced removal of a user from a channel.\n"+
  "/PRIVMSG: Is used to send private messages between users.\n"+
  //TODO Continua...);
}

// Set the user's nickname
function nick(args,socket){
  //TODO Corrigir função, erro ao usar.
  nickname = args[1].toString();
  handler.broadcast(nickname.toString() + " joined the chat\n", socket);
  socket.write("NICK command executed with sucess.\n");
}

function pass(args,socket) {
  //TODO
  socket.write("PASS command executed with sucess.\n");
}

function user(args,socket) {
  //TODO
  socket.write("USER command executed with sucess.\n");
}

function oper(args,socket){
  //TODO
  socket.write("OPER command executed with sucess.\n");
}

function mode(args,socket){
  //TODO
  socket.write("MODE command executed with sucess.\n");
}

function service(args,socket){
  //TODO
  socket.write("JOIN command executed with sucess.\n");
}

function quit(socket) {
  //TODO
  socket.write("QUIT command executed with sucess.\n");
}

function join(args,socket) {
  //TODO
  socket.write("JOIN command executed with sucess.\n");
}

function part(args, socket){
  //TODO
  socket.write("PART command executed with sucess.\n");
}

function topic(){
  //TODO
  socket.write("TOPIC command executed with sucess.\n");
}

function names(){
  //TODO
  socket.write("NAMES command executed with sucess.\n");
}

function list(){
  //TODO
  socket.write("LIST command executed with sucess.\n");
}

function invite(){
  //TODO
  socket.write("INTITE command executed with sucess.\n");
}

function kick(){
  //TODO
  socket.write("KICK command executed with sucess.\n");
}

function privmsg(){
  //TODO
  socket.write("PRIVMSG command executed with sucess.\n");
}
