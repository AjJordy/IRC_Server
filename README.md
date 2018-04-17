# Universidade Federal de Goiás

## Projeto 1 do Grupo 2

### Membros:


**Rafael Ratacheski de Sousa Raulino** - *rafaelratacheski@gmail.com* - Master

**Jordy Aparecido Faria de Araújo** - *jordyfaria0@gmail.com* - Developer

**Tiago Santana de Castro** - *tiagosantanadecastro@gmail.com* - Developer

**Adílio Vitor de Oliveira Júnior** - *adiliojr31@hotmail.com* - Developer

**Victor Gomide Ferraz** - *victorgomferraz2@gmail.com* - Developer


## Projeto Servidor IRC

* Implementando um servidor de chat pautado sobre o protocolo IRC.

* Bate-papo entre usuarios em diversos canais.

# Manual do usuário

### Passo a passo 

1. Use o comando PASS \<senha> para definir uma senha.
2. Use o comando NICK \<apelido> para definir um apelido.
3. Use o comando USER \<user> \<modo> * : \<nome real> para estabelecer uma conexão com o servidor.
4. Use o comando JOIN \<canal> para se juntar a um canal.
5. Divirta-se.

### Funções suportadas 

* HELP
* NICK
* PASS
* USER
* OPER
* MODE
* SERVICE
* QUIT
* JOIN
* PART
* TOPIC
* NAMES
* LIST
* INVITE
* KICK
* PRIVMSG
* VERSION
* WHO
* AWAY

Mais informações no link: *'https://tools.ietf.org/html/rfc2812'*

# Manual do desenvolvedor

Para executar o arquivo javascript é necessário baixar o nodejs.(Para isso rode o comando no linux: *'sudo apt-get install nodejs-legacy'*)

Após isso basta rodar o comando *'node \<arquivo.js>'*. 

No caso específio de abrir o servidor IRC. É necessário usar *'node server.js'* do diretório *'~/p1g1/server/'*.

# Diagrama de Classes

![GitHub Logo](/p1-g1.png)

### Rodar Testes do servidor

Em nosso projeto utilizamos o *jasmine (https://jasmine.github.io)*  para testes unitários.

**Para rodar o jasmine para teste unitário:**

1 - Instalar o *jasmine* em seu servidor via npm. (Para isso rode o comando: *'npm install -g jasmine'*);

2 - Instalar os pacotes do projeto *- caso não tenha feito -* para isso rode: *'npm install'*;

3 - Agora basta rodar o comando *'npm test'* e todos os testes unitários desenvolvidos serão executados;

