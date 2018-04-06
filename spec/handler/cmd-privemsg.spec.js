var faker = require('faker');

clientFactory = require('../factory/client-factory');
channelFactory = require('../factory/channel-factory');
handler = require('../../handler/handler.js');

var createClientList = function (numberOfClients) {
    if (numberOfClients === undefined)
        numberOfClients = 10;

    var clients = [];
    for (var i = 0; i < numberOfClients; i++) {
        clients.push(clientFactory.createClientWithNick());
    }
    return clients;
}.bind(this);

var createChannelList = function (numberOfChannel) {
    if (numberOfChannel === undefined)
        numberOfChannel = 10;

    var clients = [];
    for (var i = 0; i < numberOfChannel; i++) {
        clients.push(channelFactory.createChannelWithClients());
    }
    return clients;
}.bind(this);

describe("Deve testar a mensagem privada", function () {


    it("Enviar mensagem privada para 1 cliente", function () {
        //PRIVMSG [nickname] : [message]
        var clients = createClientList();
        var clienteAtivo = clients[0];
        var clienteAmigo = clients[1];
        var outros = [].concat(clients).splice(2);

        var mensagem = faker.lorem.sentence();
        var comando = 'PRIVMSG ' + clienteAmigo.nick + ' :' + mensagem;
        handler.analyze(comando, clienteAtivo, clients, []);

        var esperado = "Private message from " + clienteAtivo.nick + " " + mensagem + "\n";
        expect(esperado).toBe(clienteAmigo.socket.getRespostas()[0]);

        //Nenhum deles deve receber uma resposta
        expect(0).toBe(clienteAtivo.socket.getRespostas().length);
        outros.forEach(function (cliente) {
            expect(0).toBe(cliente.socket.getRespostas().length);
        });
    });

    it("Enviar mensagem privada para mais de 1 cliente", function () {
        //PRIVMSG [nickname], [nickname2] : [message]
        var clients = createClientList();
        var clienteAtivo = clients[0];

        var numeroRecebedores = faker.random.number(clients.length - 2); // -2 (1 cliente atual, minimo 1 cliente sem receber)
        var clientesRecebedores = [].concat(clients).splice(1, numeroRecebedores);
        var outros = [].concat(clients).splice(numeroRecebedores + 1);

        var mensagem = faker.lorem.sentence();
        var clientesRecebedoresNickArray = clientesRecebedores.map(function (dest) {
            return dest.nick;
        });
        var comando = 'PRIVMSG ' + clientesRecebedoresNickArray.join(', ') + ' :' + mensagem;

        handler.analyze(comando, clienteAtivo, clients, []);

        var esperado = "Private message from " + clienteAtivo.nick + " " + mensagem + "\n";

        //Devem receber uma mensagem privada
        clientesRecebedores.forEach(function (cliente) {
            expect(esperado).toBe(cliente.socket.getRespostas()[0]);
        });

        //Nenhum deles deve receber uma mensagem privada
        expect(0).toBe(clienteAtivo.socket.getRespostas().length);
        outros.forEach(function (cliente) {
            expect(0).toBe(cliente.socket.getRespostas().length);
        });
    });

    it("Enviar mensagem privada para 1 canal", function () {
        //PRIVMSG [channel] : [message]
        var clienteAtivo = clientFactory.createClientWithNick();
        var channel = channelFactory.createChannelWithClients();

        var channels = [];
        channels.push(channel);

        var clients = [].concat(channel.members);
        clients.push(clienteAtivo);

        var mensagem = faker.lorem.sentence();
        var comando = 'PRIVMSG ' + channel.name + ' :' + mensagem;

        handler.analyze(comando, clienteAtivo, clients, channels);

        var esperado = "Private message from " + clienteAtivo.nick + " " + mensagem + "\n";

        //Devem receber uma mensagem privada
        channel.members.forEach(function (cliente) {
            expect(esperado).toBe(cliente.socket.getRespostas()[0]);
        });

        //Nenhum deles deve receber uma mensagem privada
        expect(0).toBe(clienteAtivo.socket.getRespostas().length);
    });

    it("Enviar mensagem privada para canais e clientes", function () {
        //PRIVMSG [nickname], [nickname2] : [message]
        var clients = createClientList();
        var channels = createChannelList();

        var clienteAtivo = clients[0];

        var numeroClientesRecebedores = faker.random.number(clients.length - 2); // -2 (1 cliente atual, minimo 1 cliente sem receber)
        var numeroCanaisRecebedores = faker.random.number(channels.length - 1); // -1( no minimo 1 canal sem receber)

        var clientesRecebedores = [].concat(clients).splice(1, numeroClientesRecebedores);
        var canaisRecebedores = [].concat(clients).splice(1, numeroCanaisRecebedores);

        var outrosClientes = [].concat(clients).splice(numeroClientesRecebedores + 1);
        var outrosCanais = [].concat(channels).splice(numeroCanaisRecebedores + 1);

        var mensagem = faker.lorem.sentence();
        var clientesRecebedoresNickArray = clientesRecebedores.map(function (dest) {
            return dest.nick;
        });
        var canaisRecebedoresNomeArray = canaisRecebedores.map(function (dest) {
            return dest.name;
        });
        var comando = 'PRIVMSG ' + clientesRecebedoresNickArray.concat(canaisRecebedoresNomeArray).join(', ') + ' :' + mensagem;

        handler.analyze(comando, clienteAtivo, clients, []);

        var esperado = "Private message from " + clienteAtivo.nick + " " + mensagem + "\n";

        canaisRecebedores.forEach(function (channel) {
            clientesRecebedores.concat(channel.members);
        });

        //Devem receber uma mensagem privada
        clientesRecebedores.forEach(function (cliente) {
            expect(esperado).toBe(cliente.socket.getRespostas()[0]);
        });


        //Nenhum deles deve receber uma mensagem privada
        expect(0).toBe(clienteAtivo.socket.getRespostas().length);

        outrosCanais.forEach(function (channel) {
            outrosClientes.concat(channel.members);
        });
        outrosClientes.forEach(function (cliente) {
            expect(0).toBe(cliente.socket.getRespostas().length);
        });
    });

});