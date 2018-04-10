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
        var client = clientFactory.createClientWithNick();
        client.channels.push(channel);
        channel.members.push(client);
    }
    return channel;
}

function createChannelList(numberOfChannel) {
    if (numberOfChannel === undefined)
        numberOfChannel = 10;

    var clients = [];
    for (var i = 0; i < numberOfChannel; i++) {
        clients.push(createChannelWithClients());
    }
    return clients;
}

module.exports = {
    createChannelOnlyName: createChannelOnlyName,
    createChannelWithClients: createChannelWithClients,
    createChannelList: createChannelList
};