var faker = require('faker');

clientFactory = require('../factory/client-factory');
channelFactory = require('../factory/channel-factory');
handler = require('../../handler/handler.js');


describe("Deve testar a nick", function () {

    it("Deve adicionar ou alterar", function () {
        var clients = clientFactory.createClientList();
        var clienteAtivo = clients[0];
        var clientsWithoutAtivo = [].concat(clients).splice(1);
        var nick = faker.name.firstName() + faker.random.number();

        var comando = 'NICK ' + nick;
        handler.analyze(comando, clienteAtivo, clients, []);

        expect(0).toBe(clienteAtivo.socket.getRespostas().length);

        var esperado = clienteAtivo.nick + ": " + clienteAtivo.nick + " joined the chat\n";
        clientsWithoutAtivo.forEach(function (client) {
            expect(esperado).toBe(client.socket.getRespostas()[0]);
        });
    });


    it("Deve possuir cliente com mesmo nick", function () {
        var clients = clientFactory.createClientList();
        var clienteAtivo = clients[0];
        var clientsWithoutAtivo = [].concat(clients).splice(1);
        var nick = clientsWithoutAtivo[0].nick;

        var comando = 'NICK ' + nick;
        handler.analyze(comando, clienteAtivo, clients, []);

        expect("ERR_NICKNAMEINUSE\n").toBe(clienteAtivo.socket.getRespostas()[0]);

        clientsWithoutAtivo.forEach(function (client) {
            expect(0).toBe(client.socket.getRespostas().length);
        });
    });

});