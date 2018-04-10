exports.constructor = function(name)
{
  var objChannel = new Object();
  objChannel.name = name;
  objChannel.members = [];
  objChannel.operators = [];
  objChannel.private = false;
  objChannel.secret = false;
  objChannel.inviteOnly = false;
  objChannel.topicSetOnlyOp = false;
  objChannel.noMsgOutside = false;
  objChannel.moderated = false;
  objChannel.userLimit = 100;
  objChannel.banMask = "";
  objChannel.canSpeak = [];
  objChannel.password = "";

  return objChannel;
}
