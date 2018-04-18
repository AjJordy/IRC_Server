 exports.constructor = function(socket){
   var objClient = new Object();
   objClient.socket = socket;
   objClient.nick = null;
   objClient.awayMessage = "";
   objClient.channels = [];
   objClient.isOp = false;
   objClient.wallops = false;
   objClient.visible = true;
   objClient.pswdtmp=null;
   objClient.pswd=null;
   objClient.quitMessage = null;
   objClient.isRegistered = false;
   objClient.serverNotices = false;

   return objClient;
};
