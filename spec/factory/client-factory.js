Socket = require('../ultils/socket.js');
clientEntity = require('../../entity/entity_client.js');
var faker = require('faker');

function createClientOnlyFakeSocket() {
    return clientEntity.constructor(new Socket());
}

function createClientWithNick() {
    var client = createClientOnlyFakeSocket();
    client.nick = faker.name.firstName() + faker.random.number();
    return client;
}

function createClientList(numberOfClients) {
    if (numberOfClients === undefined)
        numberOfClients = 10;

    var clients = [];
    for (var i = 0; i < numberOfClients; i++) {
        clients.push(createClientWithNick());
    }
    return clients;
}

module.exports = {
    createClientOnlyFakeSocket: createClientOnlyFakeSocket,
    createClientWithNick: createClientWithNick,
    createClientList: createClientList
};