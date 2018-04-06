// Load the TCP Library
net = require('net');
server = require('../server/server.js');


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
    PRIVMSG: 'PRIVMSG'
};


var nickname = "Anonymous";

exports.analyze = function (data, client, clients, channels) {
    var message = String(data).trim();
    var args = message.split(" ");
    if (args[0] === COMMANDS.HELP) help(socket);
    else if (args[0] === COMMANDS.NICK) nick(args, client, clients);
    else if (args[0] === COMMANDS.PASS) pass(args, client.socket);
    else if (args[0] === COMMANDS.USER) user(args, client.socket);
    else if (args[0] === COMMANDS.OPER) oper(args, client.socket);
    else if (args[0] === COMMANDS.MODE) mode(args, client.socket);
    else if (args[0] === COMMANDS.SERVICE) service(args, client.socket);
    else if (args[0] === COMMANDS.QUIT) quit(args, client.socket);
    else if (args[0] === COMMANDS.JOIN) join(args, client.socket);
    else if (args[0] === COMMANDS.PART) part(args, client.socket);
    else if (args[0] === COMMANDS.TOPIC) topic(args, client.socket);
    else if (args[0] === COMMANDS.NAMES) names(args, client.socket);
    else if (args[0] === COMMANDS.LIST) list(args, client.socket);
    else if (args[0] === COMMANDS.INVITE) invite(args, client.socket);
    else if (args[0] === COMMANDS.KICK) kick(args, client.socket, target);
    else if (args[0] === COMMANDS.PRIVMSG) privmsg(args, client, clients, channels);
    else broadcast(data.toString().trim(), client.socket, clients);
};

// Send a message to all clients
function broadcast(message, sender, clients, channel) {
    clients.forEach(function (client) {
        // Don't want to send it to sender
        if (client === sender) return;
        client.socket.write(nickname + ": " + message + "\n");
    });
    // Log it to the server output too
    process.stdout.write(message);
}

// List all commands available
function help(socket) {
    socket.write("\nCommands of connection registration:\n" +
        "NICK: To set your nickname.\n" +
        "PASS: To set your password.\n" +
        "USER: used at the beginning of connection to specify the username.\n" +
        "OPER: To obtain operator privileges.\n" +
        "MODE: The available modes are as follows:\n" +
        "\ta - user is flagged as away;\n" +
        "\ti - marks a users as invisible;\n" +
        "\tw - user receives wallops;\n" +
        "\tr - restricted user connection;\n" +
        "\to - operator flag;\n" +
        "\tO - local operator flag;\n" +
        "\ts - marks a user for receipt of server notices.\n" +
        "SERVICE: To register a new service.\n" +
        "QUIT: To quit of the chat.\n\n" +
        "Commands of Channel operations:\n\n" +
        "JOIN: To enter in a channel.\n" +
        "PART: causes the user sending the message to be removed from the list of active members\n" +
        "TOPIC: Is used to change or view the topic of a channel.\n" +
        "NAMES: a user can list all nicknames that are visible to him.\n" +
        "LIST: The list command is used to list channels and their topics.\n" +
        "INVITE: Is used to invite a user to a channel.\n" +
        "KICK: Is used to request the forced removal of a user from a channel.\n" +
        "PRIVMSG: Is used to send private messages between users.\n"
        //TODO Continua...
    );
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
    broadcast(client.nick.toString() + " joined the chat\n", client, clients);
    client.socket.write("NICK command executed with sucess.\n");
  }
}

function pass(args, socket) {
    //TODO
    socket.write("PASS command executed with sucess.\n");
}

function user(args, socket) {
    //TODO
    socket.write("USER command executed with sucess.\n");
}

function oper(args, socket) {
    //TODO
    socket.write("OPER command executed with sucess.\n");
}

function mode(args, socket) {
    //TODO
    socket.write("MODE command executed with sucess.\n");
}

function service(args, socket) {
    //TODO
    socket.write("JOIN command executed with sucess.\n");
}

function quit(args, client, clients) {
    var socket = client.socket;
    if (!args[1]) {
        // Remove usuario sem mostrar nenhuma mensagem
        if (broadcast(client.nick + " quits\n", client));
        socket.end();
        remove(client);
    } else {
        // Remove usuario exibindo mensagem escrita por ele
        args.splice(0, 1);
        var mesg = args.join(" ");
        broadcast(client.nick + " quits: " + mesg + "\n", client, clients, canal = client.channels);
        socket.end();
        remove(client);
    }
}

function remove(client) {
    delete server.nicks[client.nick];
    var index = server.clients.indexOf(client);
    server.clients.splice(index, 1);
}


function join(args, client, clients, nicks, channels) {
    var socket = client.socket;

    if (!args[1]) {
        socket.write("ERROR: invalid request, try /join <#channel>\n");
        return;
    }
    else {
        var channelName = args.slice(1);

        for (i = 0; i < channels.length; i++) {
            //checa se o canal existe
            if (channels[i].name == channelName) {
                var chn = channels[i];
                client.channels.push(chn);
                channels[i].clients.push(client);
                server.channels = channels;
                client.socket.write("You joined " + chn.name + ".\n");
            }
        }
    }
}


function part(args, socket) {
    //TODO
    socket.write("PART command executed with sucess.\n");
}

function topic() {
    //TODO
    socket.write("TOPIC command executed with sucess.\n");
}

function names() {
    //TODO
    socket.write("NAMES command executed with sucess.\n");
}

function list() {
    //TODO
    socket.write("LIST command executed with sucess.\n");
}

function invite() {
    //TODO
    socket.write("INTITE command executed with sucess.\n");
}

function kick() {
    //TODO
    socket.write("KICK command executed with sucess.\n");
}

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
exports.broadcast = broadcast;
