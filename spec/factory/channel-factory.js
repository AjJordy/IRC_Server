channelEntity = require('../../entity/entity_channel.js');
clientFactory = require('../factory/client-factory');
var faker = require('faker');

function createChannelOnlyName() {
    return channelEntity.constructor('#' + faker.name.firstName());
}

function createChannelWithClients(numberOfClients) {
    var channel = createChannelOnlyName();
    if (numberOfClients === undefined)
        numberOfClients = 10;

    for (var i = 0; i < numberOfClients; i++) {
        channel.members.push(clientFactory.createClientWithNick())
    }
    return channel;
}

module.exports = {
    createChannelOnlyName: createChannelOnlyName,
    createChannelWithClients: createChannelWithClients
};