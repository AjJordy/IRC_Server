 exports.constructor = function(socket){
 	var objClient = new Object();
 	objClient.socket = socket;
 	objClient.away = false;
 	objClient.nick = null;
 	objClient.awayMessage = "";
 	objClient.channels = [];
 	objClient.isOp = false;
	objClient.visible = true;
 	objClient.pswdtmp=null;
 	objClient.pswd=null;
	objClient.quitMessage = null;
	objClient.isRegistered = false;
        objClient.wallops = false;
        objClient.restricted = false;
        objClient.isLocalOp = false;
        objClient.receiptServerNotices = false;
        objClient.userName = "";
        objClient.realName = "";

 	return objClient;
};
