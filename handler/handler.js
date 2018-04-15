// Load the TCP Library
net = require('net');
server = require('../server/server.js');
channelObject = require('../entity/entity_channel.js');

passOp = "admin";
ver = "1.0";
var nickname = "Anonymous";

// Send a message to all clients
exports.broadcast = function(message, sender, clients) {
  try {
    clients.forEach(function (client) {
    // Don't want to send it to sender
    if (client === sender) return;
        client.socket.write(sender.nick+": "+message+"\n");
        // Log it to the server output too
        process.stdout.write(sender.nick+": "+message+"\n");
    });
  } catch (e){
        console.log("erro", e);
  }

}

const COMMANDS = {
    HELP: 'HELP',
    NICK: 'NICK',
    PASS: 'PASS',
    USER: 'USER',
    OPER: 'OPER',
    MODE: 'MODE',
    SERVICE: 'SERVICE',
    QUIT: 'QUIT',
    JOIN: 'JOIN',
    PART: 'PART',
    TOPIC: 'TOPIC',
    NAMES: 'NAMES',
    LIST: 'LIST',
    INVITE: 'INVITE',
    KICK: 'KICK',
    PRIVMSG: 'PRIVMSG',
    VERSION: 'VERSION',
    WHO: 'WHO',
	BACK: 'BACK',
	AWAY: 'AWAY'
};

exports.analyze = function (data, client, clients, channels) {
  var message = String(data).trim();
  var args = data.toString().trim().split(" ");
  if (args[0] === COMMANDS.HELP) help(client);
  else if (args[0] === COMMANDS.NICK) nick(args, client, clients);
  else if (args[0] === COMMANDS.PASS) pass(args, client);
  else if (args[0] === COMMANDS.USER) user(args, client, clients);
  else if (args[0] === COMMANDS.AWAY) away(args, client);
  else if (args[0] === COMMANDS.BACK) back(args, client);
  else if (args[0] === COMMANDS.WHO)  who(args, client, clients);
  else if (args[0] === COMMANDS.OPER) oper(args, client);
  else if (args[0] === COMMANDS.MODE) mode(args, client);
  else if (args[0] === COMMANDS.SERVICE) service(args, client);
  else if (args[0] === COMMANDS.QUIT) quit(args, client);
  else if (args[0] === COMMANDS.JOIN) join(args, client);
  else if (args[0] === COMMANDS.PART) part(args, client);
  else if (args[0] === COMMANDS.TOPIC) topic(args, client);
  else if (args[0] === COMMANDS.NAMES) names(args, client,channels);
  else if (args[0] === COMMANDS.LIST) list(args, client);
  else if (args[0] === COMMANDS.INVITE) invite(args, client);
  else if (args[0] === COMMANDS.KICK) kick(args, client, target);
  else if (args[0] === COMMANDS.PRIVMSG) privmsg(args, client, clients, channels);
  else if (args[0] === COMMANDS.VERSION) version(client);
  else client.socket.write("Command doesn't exist.");//handler.broadcast(data.toString().trim(), client, clients);
};



// List all commands available
function help(client){
  client.socket.write("\nCommands of connection registration:\n"+
  "NICK: Parameters: <nickname>. To set your nickname.\n"+
  "PASS: Parameters: <password>. To set your password.\n"+
  "USER: Parameters: <user> <mode> <unused> <realname>. Used at the beginning of connection to specify the username.\n"+
  "OPER: Parameters: <name> <password>. To obtain operator privileges.\n"+
  "MODE: Parameters: <nickname> *( ( + / -) *( i / w / o / O / r ) )The available modes are as follows:\n" +
  "\ta - user is flagged as away;\n"+
  "\ti - marks a users as invisible;\n"+
  "\tw - user receives wallops;\n"+
  "\tr - restricted user connection;\n"+
  "\to - operator flag;\n"+
  "\tO - local operator flag;\n"+
  "\ts - marks a user for receipt of server notices.\n"+
  "SERVICE: Parameters: <nickname> <reserved> <distribution> <type> <reserved> <info>. To register a new service.\n"+
  "QUIT: Parameters: [ <Quit Message> ]. To quit of the chat.\n"+
  "SQUIT: Parameters: <server> <comment>. The SQUIT command is available only to operators. It is used to disconnect server links. \n"+
  "\nCommands of Channel operations:\n\n"+
  "JOIN: Parameters: ( <channel> *( \",\" <channel> ) [ <key> *( \",\" <key> ) ] ) / \"0\" To enter in a channel.\n"+
  "PART:  Parameters: <channel> *( \",\" <channel> ) [ <Part Message> ]. Causes the user sending the message to be removed from the list of active members\n"+
//  "TOPIC: Parameters: <channel> [ <topic> ]. This is used to change or view the topic of a channel.\n"+
  "NAMES: Parameters: [ <channel> \*( \",\" <channel> ) [ <target> ] ]. A user can list all nicknames that are visible to him.\n"+
  "LIST: Parameters: [ <channel> *( \",\" <channel> ) [ <target> ] ]. The list command is used to list channels and their topics.\n"+
  "INVITE: Parameters: <nickname> <channel>. This is used to invite a user to a channel.\n"+
  "KICK: Parameters: <channel> *( \",\" <channel> ) <user> *( \",\" <user> ) [<comment>]. This is used to request the forced removal of a user from a channel.\n"+
  "PRIVMSG: Parameters: <msgtarget> <text to be sent>. This is used to send private messages between users.\n"+
//  "NOTICE:  Parameters: <msgtarget> <text>. This is used similarly to PRIVMSG. The difference between NOTICE and PRIVMSG is that automatic replies MUST NEVER be sent in response to a NOTICE message.\n" +
  "\nServer queries and commands.\n\n"+
//  "MOTD: Parameters: [ <target> ]. This is used to get the Message Of The Day of the given server, or current server if <target> is omitted.\n"+
//  "LUSERS:  Parameters: [ <mask> [ <target> ] ]. The LUSERS command is used to get statistics about the size of the IRC network.\n"+
  "VERSION:  Parameters: [ <target> ]. This is used to query the version of the server program.\n"+
//  "STATS:  Parameters: [ <query> [ <target> ] ]. The stats command is used to query statistics of certain server.\n"+
//  "LINKS:   Parameters: [ [ <remote server> ] <server mask> ]. A user can list all servernames, which are known by the server answering the query.\n"+
//  "TIME:  Parameters: [ <target> ]. The time command is used to query local time from the specified server.\n"+
//  "CONNECT:  Parameters: <target server> <port> [ <remote server> ]. The CONNECT command can be used to request a server to try to establish a new connection to another server immediately.\n"+
//  "TRACE: Parameters: [ <target> ] .Command is used to find the route to specific server and information about its peers.\n"+
//  "ADMIN:  Parameters: [ <target> ].  The admin command is used to find information about the administrator of the given server, or current server if <target> parameter is omitted.\n"+
//  "INFO: Parameters: [ <target> ]. The INFO command is REQUIRED to return information describing the server: its version, when it was compiled, the patchlevel, when it was started, and any other miscellaneous information which may be considered to be relevant.\n"+
  "SERVLIST:  Parameters: [ <mask> [ <type> ] ]. The SERVLIST command is used to list services currently connected to the network and visible to the user issuing the command.\n"+
//  "SQUERY: Parameters: <servicename> <text> The SQUERY command is used similarly to PRIVMSG. The only difference is that the recipient MUST be a service. This is the only way for a text message to be delivered to a service.\n"+
  "WHO: Parameters: [ <mask> [ \"o\" ] ]. The WHO command is used by a client to generate a query which returns a list of information which ’matches’ the <mask> parameter given by the client.\n"+
//  "WHOIS: Parameters: [ <target> ] <mask> *( \",\" <mask> ) This command is used to query information about particular user.\n"+
//  "WHOWAS: Parameters: <nickname> *( \",\" <nickname> ) [ <count> [ <target> ] ]. Whowas asks for information about a nickname which no longer exists.\n"+
//  "KILL: Parameters: <nickname> <comment> The KILL command is used to cause a client-server connection to be closed by the server which has the actual connection.\n"+
//  "PING : Parameters: <server1> [ <server2> ] The PING command is used to test the presence of an active client or server at the other end of the connection. \n"+
//  "PONG: Parameters: <server> [ <server2> ] PONG message is a reply to ping message.\n"+
//  " ERROR: Parameters: <error message> The ERROR command is for use by servers when reporting a serious or fatal error to its peers.\n"+
  "AWAY: Parameters: [ <text> ] With the AWAY command, clients can set an automatic reply string for any PRIVMSG commands directed at them (not to a channel they are on).\n"+
//  "REHASH:  Parameters: [None]. The rehash command is an administrative command which can be used by an operator to force the server to re-read and process its configuration file.\n"+
//  "DIE:  Parameters: [None]. An operator can use the DIE command to shutdown the server.\n"+
//  "RESTART:  Parameters: [None]. An operator can use the restart command to force the server to restart itself.\n"+
//  "SUMMON:  Parameters: <user> [ <target> [ <channel> ] ] The SUMMON command can be used to give users who are on a host running an IRC server a message asking them to please join IRC.\n"+
  "USERS:  Parameters: [ <target> ] The USERS command returns a list of users logged into the server in a format similar to the UNIX commands who(1), rusers(1) and finger(1).\n"
//  "WALLOPS:  Parameters: <Text to be sent> The WALLOPS command is used to send a message to all currently connected users who have set the ’w’ user mode for themselves.\n"+
//  "USERHOST:  Parameters: <nickname> *( SPACE <nickname> ) The USERHOST command takes a list of up to 5 nicknames, each separated by a space character and returns a list of information about each nickname that it found. \n"+
//  "ISON:  Parameters: <nickname> *( SPACE <nickname> ) The ISON command was implemented to provide a quick and efficient means to get a response about whether a given nickname was currently on IRC.\n"
  );
}

// Set the user's nickname
function nick(args, client, clients){
  if(args.length < 2)
    client.socket.write("ERR_NONICKNAMEGIVEN");
  else{
      var nick = args.slice(1);
      console.log("valor do nick "+nick);
      // Look for all channels
      if (clients != null) {
          for (i = 0; i < clients.length; i++) {
              // Look for all members' name
              console.log(clients[i].nick);
                  if (clients[i].nick == nick) {
                      client.socket.write("ERR_NICKNAMEINUSE");
                      return;
                  }
          }
          client.nick = nick;
          console.log("nick no client" +client.nick);
          exports.broadcast(client.nick.toString() + " joined the chat\n", client, clients);
      }
  }
}

// Set the user's password
function pass(args, client) {
  if(args.length < 2)
      client.socket.write("ERR_NEEDMOREPARAMS");
  else
      client.pswd = args[1].toString();
}

// Client quit from the server
function quit(args, client, clients) {
  var socket = client.socket;
  if(!args[1]){
    // Remove usuario sem mostrar nenhuma mensagem
    if(handler.broadcast(client.nick + " quits\n", client));
    socket.end();
    remove(client);
  } else {
    // Remove usuario exibindo mensagem escrita por ele
    args.splice(0, 1);
    var mesg = args.join(" ");
    handler.broadcast(client.nick + " quits: " + mesg + "\n", client, clients);
    socket.end();
    remove(client);
  }
}

// User is away from keyboard
function away(args, client){
  var socket = client.socket;
  if(!args[1]){
    socket.write("ERROR: invalid request, try /away <message>\n");
    return;
  }
  else{
    var msg = args.slice(1);
    client.away = true;
    client.awayMessage = msg.join(" ");
    socket.write("Your status is set as AWAY: " + client.awayMsg + "\n");
  }
}

// User came back to keyboard
function back(args, client){
  if(args[1]){
    client.socket.write("ERROR: invalid request, try /back\n");
    return;
  } else{
    client.away = false;
    client.awayMessage = null;
    socket.write("Your status is no longer set as AWAY.\n");
  }
}

// Returns a list of information given by the client
function who(args, client, clients){
  //query for all visible
  if(!args[1] || args[1] == 0){
    client.write("/who for all visible users:\n");
    for(i = 0; i < clients.length; i++){
      if(clients[i].visible)
        client.write(clients[i].nick)
    }
  }
  else if(args[1] && args[1] != 0){
    if(args[2] && args[2] != 'o'){
      socket.write("ERROR: invalid request, try /who <mask> <o>\n");
      return;
    }
    else{
      //search for operators
      if(args[2] && args[2] == 'o'){
        client.write("/who for all operators matching mask''" + args[2] + "':\n'");
        for(i = 0; i < clients.length; i++){
          if(clients[i].visible && clients[i].isOp && (clients[i].nick.includes(args[2]) || clients[i].user.includes(args[2])))
            client.write(clients[i].nick);
        }
      }
      else{
        client.write("/who for all users matching mask''" + args[2] + "':\n'");
        for(i = 0; i < clients.length; i++){
          if(clients[i].visible && (clients[i].nick.includes(args[2]) || clients[i].user.includes(args[2])))
            client.write(clients[i].nick);
        }
      }
    }
  }
  else{
    socket.write("ERROR: invalid request, try /who <mask or 0>\n");
    return;
  }
}


// Remove the client from the server
function remove(client) {
    delete server.nicks[client.nick];
    var index = server.clients.indexOf(client);
    server.clients.splice(index, 1);
}

// Client enter in a channel
function join(args, client, clients, nicks, channels) {
    var socket = client.socket;
    if (!args[1]) {
        socket.write("ERROR: invalid request, try /join <#channel>\n");
        return;
    } else {
        var channelName = args.slice(1);
        var chan = false;
        for (i = 0; i < channels.length; i++) {
            //checa se o canal existe
            if (channels[i].name == channelName) {
				chan = true;
                client.channels.push(channels[i]);
                channels[i].members.push(client);
                server.channels = channels;
                client.socket.write("You joined " + chn.name + ".\n");
                return;
            }
        }
		if(chan=!true){
			channelObject = clientEntity.constructor(channelName);
			channelObject.members.push(client);
		}
    }
}

// Send a privet message to a channel or another client
function privmsg(args, client, clients, channels) {
    var socket = client.socket;
    var comando = args.join(" ");
    var regexFindDestinatarios = new RegExp(COMMANDS.PRIVMSG + ' (.*) :\ *');
    var destinatariosFind = comando.match(regexFindDestinatarios);
    if (destinatariosFind === null || comando.indexOf(':') === -1) {
        socket.write("Incomplete Command");
        return;
    }
    var destinatarios = destinatariosFind[1].replace(/\s/g, '').split(',');
    var writeMessage = function (clientDest) {
        var msg = comando.substr(comando.indexOf(':') + 1);
        clientDest.socket.write("Private message from " + client.nick + " " + msg + "\n");
    }.bind(this);


    clients.forEach(function (clientDest) {
        if (destinatarios.indexOf(clientDest.nick) !== -1) {
            writeMessage(clientDest);
        }
    });

    channels.forEach(function (channelDest) {
        if (destinatarios.indexOf(channelDest.name) !== -1) {
            channelDest.members.forEach(function (clientDest) {
                writeMessage(clientDest);
            });
        }
    });
}


// Set the client's username
function user(args,client, clients) {

  if(args.length < 5)
    client.socket.write("Need more params\n\n");
  else{
    flag = clients.every(function(client2) {
        return args[1] != client2.userName;
    });
    if(!flag)
      client.socket.write("This username already exists. Try another one\n\n");
    else {
      if(args[2].length > 1)
        client.socket.write("Mode parameter need be 8 or less");
      else {
        client.userName = args[1];
        if(+args[2] & 4)
          client.wallops = true;
        if(+args[2] & 8)
          client.visible = false;
        for(var i = 4 ; i < args.length ; i++){
          client.realName += args[i];
          client.realName += " ";
        }
        client.realName = client.realName.trim();
        client.socket.write("USER command executed with sucess.\n");
      }
    }
  }
}

// Enter with operator mode
function oper(args, client) {
    if(args.length < 2){
        client.socket.write("ERR_NEEDMOREPARAMS");
    }else{
        if(args[1] == passOp)
            client.isOp = true;
    }

}

// List the user's name of the channel
function names(args, client, channels) {
    var channelName = args.slice(1);
    for (i = 0; i < channels.length; i++) {
        // Checa se o canal existe
        if (channels[i].name == channelName) {
            var users = channels[i].members;
            for(j=0;j<users.length;j++){
                if(user[i].visible == true)
                    client.socket.write(users[i].name + ".\n");
            }
        }
    }
}

// List all the channels
function list(args, client, channels) {
    for (i = 0; i < channels.length; i++) {
        client.socket.write(channels[i].name + ".\n");
    }
}

// Show the server's version
function version(client) {
    client.socket.write("IRC Server "+ ver);
}
