// Send a message to all clients
var channels = [];

exports.broadcast = function (message, sender, clients) {
  clients.forEach(function (client) {
    // Don't want to send it to sender
   if (client === sender) return;
    client.socket.write(sender.nick+": "+message+"\n");
  });
  // Log it to the server output too
  
 // process.stdout.write(message+"\n");
}

exports.analize = function (data, client, clients) {

  var message = String(data).trim();

  //Os args estavam vindo separados por vírgula, e não por espaço

  // console.log(message);

  var args = message.split(" ");

  if (args[0] == "/HELP") help(socket);
  else if (args[0] == "/NICK") nick(args,client, clients);
  else if (args[0] == "/PASS") pass(args,client.socket);
  else if ( args[0] == "/USER") user(args,client, clients);
  else if ( args[0] == "/OPER") oper(args,client.socket);
  else if ( args[0] == "/MODE") mode(args,client.socket);
  else if ( args[0] == "/SERVICE") service(args,client.socket);
  else if ( args[0] == "/QUIT") quit(args,client.socket);
  else if ( args[0] == "/JOIN") join(args,client.socket);
  else if ( args[0] == "/PART") part(args,client.socket);
  else if ( args[0] == "/TOPIC") topic(args,client.socket);
  else if ( args[0] == "/NAMES") names(args,client.socket);
  else if ( args[0] == "/LIST") list(args,client.socket);
  else if ( args[0] == "/INVITE") invite(args,client.socket);
  else if ( args[0] == "/KICK") kick(args,client.socket,target);
  else if ( args[0] == "/PRIVMSG") privmsg(target,args,client.socket);
  else exports.broadcast(data, client, clients);
  //else client.socket.write("Error: Non-existent command.\n");
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
  "/PRIVMSG: Is used to send private messages between users.\n")//+
  //TODO Continua...);
}

// Set the user's nickname
function nick(args,client, clients){
  //TODO Corrigir função, erro ao usar.
  if(args.length < 2)
  {
    client.socket.write("Need more params\n\n");
  }
  else
  {
    client.nick = args[1].toString();
    handler.broadcast(client.nick.toString() + " joined the chat\n", client, clients);
    client.socket.write("NICK command executed with sucess.\n");
  }
}

function pass(args,socket) {
  //TODO
  socket.write("PASS command executed with sucess.\n");
}

function user(args,client, clients) {

  if(args.length < 5)
  {
    client.socket.write("Need more params\n\n");
  }
  else
  {

    flag = clients.every(function(client2) {
             return args[1] != client2.userName;
    });

    if(!flag) {

      client.socket.write("This username already exists. Try another one\n\n");

    }
    else {

      if(args[2].length > 1) {

        client.socket.write("Mode parameter need be 8 or less");

      }
      else {

        client.userName = args[1];

        if(+args[2] & 4)
          client.wallops = true;

        if(+args[2] & 8)
          client.visible = false;
        
        for(var i = 4 ; i < args.length ; i++)
        {
          client.realName += args[i];
          client.realName += " ";
        }

        client.realName = client.realName.trim();

        client.socket.write("USER command executed with sucess.\n");

        console.log(client);
      }
    }
  }
}

function oper(args,socket){
  //TODO
  socket.write("OPER command executed with sucess.\n");
}

function mode(args,client,clients){

  if(args.length() < 2) {

    client.socket.write("Need more params");

  }
  else {

    if (args[2][0] == "+")
      var addOrRemove = true;
    else if (args[2][0] == "-")
      var addOrRemove = false;
    else
      return ;

    var modes = args[2].length();
    if(modes < 2) {
      client.socket.write("Need more params");
      return;
    }
    else {
      }
      
      

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
