Socket = require('../ultils/socket.js');
clientEntity = require('../../entity/entity_client.js');
handler = require('../../handler/handler.js');

function createClientWithNick(nick) {
  var client = clientEntity.constructor(new Socket());
  client.nick = nick;
  return client;
}

describe("Deve testar a mensagem privada", function () {
  var clients = ['atual', 'amigo', 'visitante1', 'visitante2', 'visitante3']
    .map(function (nick) {
      return createClientWithNick(nick);
    });

  var clienteAtivo = clients[0];
  var clienteAmigo = clients[1];
  var outros = clients.splice(2);

  it("Deve enviar uma mensagem privada", function () {
    var mensagem = "Oi";
    var comando = 'PRIVMSG ' + clienteAmigo.nick + ' :' + mensagem;
    handler.analyze(comando, clienteAtivo, clients);

    var esperado = "Private message from " + clienteAtivo.nick + " " + mensagem + "\n";
    expect(esperado).toBe(clienteAmigo.socket.getRespostas()[0]);

    //Nenhum deles deve receber uma resposta
    expect(0).toBe(clienteAtivo.socket.getRespostas().length);
    outros.forEach(function (cliente) {
      expect(0).toBe(cliente.socket.getRespostas().length);
    });
  });
});