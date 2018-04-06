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

module.exports = {
    createClientOnlyFakeSocket: createClientOnlyFakeSocket,
    createClientWithNick: createClientWithNick
};