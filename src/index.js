//Permite lidar com rotas, parâmetros e respostas para os clientes
const express = require('express');

//Biblioteca para manipular dados e bases de dados criadas através do mongo
const mongoose = require('mongoose');

const path = require('path');

//Permite que o backend seja acessível pelo frontend em React, mesmo ele estando em domínios diferentes 
const cors = require('cors');

//Criando o servidor
const app = express();

//Permite que a aplicação use tanto o protocolo http, quanto o websocket(que permite a comunicação
//em tempo real)
//Suporte ao http
const server = require('http').Server(app);

//Suporte ao websocket
//O io é quem vai permitir o recebimento de requisições ou o envio de requisições para todos os 
//os usuários que estão conectados na aplicação
const io = require('socket.io')(server);

//Conexão com o banco de dados
mongoose.connect('mongodb+srv://omnistack7:omnistack7@cluster0-pd7ae.mongodb.net/test?retryWrites=true&w=majority', {
    //Avisa que estamos utilizando um formato de string novo pra se conectar com o mongo
    useNewUrlParser: true
});

//Deixando a variável io disponível em toda a aplicação
//Criando o próprio middleware
//A partir daqui, toda próxima rota ou requisição que seja feita terão acesso ao req.io
//Os middlewares do node, são interceptadores, para garantir que a requisição não irá para por aqui
//pq eles podem interceptar uma rota e parar, necessitamos importat next
app.use((req, res, next) => {
    req.io = io;

    //Permite que as outras rotas/middlewares que vem depois continuem sendo executados
    next();
});

//usando o cors
app.use(cors());

//Quando acessarmos a rota /files, acessamos automaticamente os arquivos estáticos, que fizemos upload
//Ex: http://localhost:3333/files/imagem.jpeg
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//Apresentando as rotas à aplicação
app.use(require('./routes'));

//Passando uma porta para o servidor ser ouvido
/* app.listen(3333); */
server.listen(3333);