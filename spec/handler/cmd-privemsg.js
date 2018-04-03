clientEntity = require('../../entity/entity_client.js');
handler = require('../../handler/handler.js');

//Mock para o socket
function Socket() {
  this.respostas = [];
}

Socket.prototype.write = function (data) {
  this.respostas.push(data);
};
Socket.prototype.getRespostas = function () {
  return this.respostas;
};



describe("Deve testar a mensagem privada", function () {
  var clientAtivo = clientEntity.constructor(new Socket());
  clientAtivo.nick = "fulano";

  var clientOnline = clientEntity.constructor(new Socket());
  clientOnline.nick = "ciclano";


  var clients = [
    clientOnline,
    clientAtivo
  ];

  it("Deve enviar uma mensagem privada", function () {
    var mensagem = "Oi";
    var comando = 'PRIVMSG ' + clientOnline.nick + ' :' + mensagem;
    handler.analyze(comando, clientAtivo, clients);

    var esperado = "Private message from " + clientAtivo.nick + " " + mensagem + "\n";
    expect(esperado).toBe(clientOnline.socket.getRespostas()[0]);
  });
});