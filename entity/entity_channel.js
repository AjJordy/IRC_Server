/**
 * Status de canal permitidos:
 *      '@' : Canais secretos
 *      '*' : Canais privados
 *      '=' : Canais publicos
 */

const STATUS = {
    'SECRETO': '@',
    'PRIVADO': '*',
    'PUBLICO': '='
};

exports.STATUS = STATUS;

exports.constructor = function(name)
{
  var objChannel = new Object();
  objChannel.name = name;
  objChannel.status = STATUS['PUBLICO'];
  objChannel.members = [];
  objChannel.topics = []; // Tem que ter, não ainda não entendi pra que serve
  
  objChannel.operators = []; //usuários que são operadores
  objChannel.priv = false; //canal privado
  objChannel.secret = false; //canal secreto
  objChannel.inviteOnly = false; //só entra quem for convidado
  objChannel.topicOnlyOp = false; //apenas operadores podem alterar o tópico do canal
  objChannel.outside = false; //recebe mensagem de pessoas de fora
  objChannel.moderated = false; //canal moderado
  objChannel.banMask = ""; //máscara de ban
  objChannel.key = ""; //senha
  
  objChannel.limit = 100; //limite de usuários no canal
  objChannel.voice = []; //usuários que podem falar no canal (apenas se o canal for moderado)
 
  return objChannel;
};
