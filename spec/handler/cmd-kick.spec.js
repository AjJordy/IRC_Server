var faker = require('faker');

clientFactory = require('../factory/client-factory');
channelFactory = require('../factory/channel-factory');
handler = require('../../handler/handler.js');

var messageClient = "You was kicked from channel [CHANNEL_NAME]";
var messageChannelWithoutReason = "[CLIENT_NAME] was kicked from channel";
var messageChannelWithReason = messageChannelWithoutReason + " :[REASON]";

describe("Deve testar a kick", function () {


    it("Deve remover 1 client de um canal sem mensagem", function () {
        var canal = channelFactory.createChannelWithClients();

        var clientesForaDoCanal = clientFactory.createClientList();
        var clientesDentroDoCanal = canal.members;

        var clienteAlvo = clientesDentroDoCanal[0];
        var clienteAtivo = clientesDentroDoCanal[1];
        var clientesDentroDoCanalForaAlvo = [].concat(clientesDentroDoCanal).splice(1);
        var reason = faker.lorem.sentence();

        var comando = 'KICK ' + canal.name + ' ' + clienteAlvo.nick + ':' + reason;
        var allClients = [].concat(clientesDentroDoCanal).concat(clientesForaDoCanal);
        var allChannels = [canal];
        handler.analyze(comando, clienteAtivo, allClients, allChannels);
        expect(0).toBe(canal.members.filter(function (member) {
            return member.nick === clienteAlvo.nick;
        }).length);

        var esperadoAlvo = messageClient.replace('[CHANNEL_NAME]', canal.name);
        expect(esperadoAlvo).toBe(clienteAlvo.socket.getRespostas()[0]);

        //Assinantes do canal menos alvo
        var esperadoCanal = messageChannelWithReason.replace('[CLIENT_NAME]', clienteAlvo.nick);
        esperadoCanal = esperadoCanal.replace('[REASON]', reason);
        clientesDentroDoCanalForaAlvo.forEach(function (cliente) {
            expect(esperadoCanal).toBe(cliente.socket.getRespostas()[0]);
        });

        //Nenhum deles deve receber uma resposta
        clientesForaDoCanal.forEach(function (cliente) {
            expect(0).toBe(cliente.socket.getRespostas().length);
        });
    });

});