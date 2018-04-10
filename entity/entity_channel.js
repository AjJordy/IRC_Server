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

	return objChannel;
};
