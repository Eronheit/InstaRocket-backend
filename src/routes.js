const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");

const routes = express.Router();

//Permite que o express entenda o formato Multipart Form Data
const upload = multer(uploadConfig);
//Middleware, interceptando a rota raíz e retornando uma resposta 
/* 
routes.get('/', (req, res) => {
    return res.send('Hello World');
}); 
*/

//Ao invés de utilizarmos o middleware dentro, vamos importar o controller com o método store

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);

//Exportando as Rotas
module.exports = routes;