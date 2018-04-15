var faker = require('faker');

clientFactory = require('../factory/client-factory');
channelFactory = require('../factory/channel-factory');
handler = require('../../handler/handler.js');


describe("Deve adicionar cliente ao canal", function () {

    it("Deve adicionar cliente", function () {
        var clients = clientFactory.createClientList();

        var channel = channelFactory.createChannelWithClients();
        var clientAtivo = clients[0];
        var allClientsWithoutAtivo = [].concat(clients).splice(1);
        var allClients = [].concat(clients).concat(channel.members);

        var channelName = channel.name;

        var comando = 'JOIN ' + channelName;
        handler.analyze(comando, clientAtivo, allClients, [channel]);


        var esperadoAtivo = "You joined " + channelName + ".\n";
        expect(esperadoAtivo).toBe(clientAtivo.socket.getRespostas()[0]);

        var esperadoDentroCanal = clientAtivo.nick + ': ' + clientAtivo.nick + " joined the chat\n";
        channel.members.forEach(function (client) {
            if (client.nick != clientAtivo.nick) {
                expect(esperadoDentroCanal).toBe(client.socket.getRespostas()[0]);
            }
        });

        allClientsWithoutAtivo.forEach(function (client) {
            expect(0).toBe(client.socket.getRespostas().length);
        });
    });

});