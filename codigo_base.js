// Load the TCP Library
net = require('net');

// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort

  // Put this new client in the list
  clients.push(socket);

  // Send a nice welcome message and announce
  socket.write("Welcome " + socket.name + "\n");
  broadcast(socket.name + " joined the chat\n", socket);
 
  io.on("connection", function (cliente) {
  cliente.on("join", function(nome){
    console.log("Entrou: " + nome);
    clients[cliente.id] = nome;
    cliente.emit("update", "Você se conectou ao servidor");
    cliente.broadcast.emit("update", nome + " entrou no servidor")
  });

  client.on("send", function(mensagem){
    console.log("Mensagem: " + mensagem);
    cliente.broadcast.emit("chat", clients[cliente.id], mensagem);
  });

  client.on("disconnect", function(){
    console.log("Disconectado");
    io.emit("update", clients[cliente.id] + " abandonou o servidor");
    delete clients[cliente.id];
  });
});
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
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }

  function analize(data){
    var mensagem = String(data).trim();
    var args = mensagem.split(" ");
    if ( args[0] == "NICK" ) nick(args);  
    else if ( args[0] == "USER") user(args);
    else if ( args[0] == "JOIN") join(args);
    else socket.write("ERRO: Non-existent command");
  }

  function user(args){
    socket.write("USER command executed with sucess.\n");
  }


  function nick(args){
    socket.write("NICK command executed with sucess.\n");
  }

  function join(args){
    socket.write("JOIN command executed with sucess.\n");
  }


}).listen(5000);

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 5000\n");
