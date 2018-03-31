exports.constructor = function(name)
{
	var objChannel = new Object();
	objChannel.name = name;
	objChannel.members = [];

	return objChannel;
}
