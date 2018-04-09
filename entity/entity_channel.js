exports.constructor = function(name)
{
	var objChannel = new Object();
	objChannel.name = name;
	objChannel.members = [];
	objChannel.topics = []; // Tem que ter, não ainda não entendi pra que serve

	return objChannel;
}
