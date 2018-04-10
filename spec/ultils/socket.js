module.exports = (function () {
  function Socket() {
    this.respostas = [];
  }

  Socket.prototype.write = function (data) {
    this.respostas.push(data);
  };

  Socket.prototype.getRespostas = function () {
    return this.respostas;
  };

  return new Socket()
});