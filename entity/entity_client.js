 exports.constructor = function(socket){
 	var objClient = new Object();
 	objClient.socket = socket;
 	objClient.away = false;
 	objClient.nick = "Anonymous";
 	objClient.awayMessage = "";
 	objClient.channels = [];
 	objClient.isOp = false;
 	objClient.modes = [];
	objClient.visible = true;
 	objClient.pswdtmp=null;
 	objClient.pswd=null;
	objClient.quitMessage = null;
	objClient.isRegistered = false;

        // Editado por Adilio
        // Adiconar os campos username e realname para utilizar no comando USER

        objClient.userName = null;
        objClient.realName = "";

 	return objClient;
}
