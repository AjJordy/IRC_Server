var faker = require('faker');

clientFactory = require('../factory/client-factory');
channelFactory = require('../factory/channel-factory');
handler = require('../../handler/handler.js');


describe("Deve adicionar cliente ao canal", function () {

    it("Deve adicionar cliente", function () {
        var clients = clientFactory.createClientList();

        var channel = channelFactory.createChannelWithClients();
        var channels = [channel];
        var clientAtivo = clients[0];
        var allClientsWithoutAtivo = [].concat(clients).splice(1);
        var allClients = [].concat(clients).concat(channel.members);

        var password = 'pass123';
        var channelName = channel.name;
        channel.key = password;

        var newchannel = '#newChannel';
        var passNewchannel = 'pass';

        var comando = 'JOIN ' + newchannel + ',' + channelName + ' ' + passNewchannel + ',' + password;
        handler.analyze(comando, clientAtivo, allClients, channels);


        var esperadoAtivo1 = "You joined " + newchannel + ".\n";
        var esperadoAtivo2 = "You joined " + channelName + ".\n";
        expect(esperadoAtivo1).toBe(clientAtivo.socket.getRespostas()[0]);
        expect(esperadoAtivo2).toBe(clientAtivo.socket.getRespostas()[1]);

        expect(passNewchannel).toBe(channels[1].key);

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