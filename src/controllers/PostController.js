const Post = require('../models/Post');
//Permite manipular imagens 
const sharp = require('sharp');
//Dependências nativas do node
const path = require('path');
const fs = require('fs');

//Exportando um objeto com os métodos do controller
module.exports = {
    //Utiliza-se async quando precisa-se utilizar códigos asincronos (promises),
    //quando o código leva um tempinho pra finalizar
    //Toda rota da aplicação é um middleware, não passamos a rota porque estamos passando no Routes
    async index(req, res) {
        //Buscando todos os posts por ordem de criação decrescente e retornando em formato json
        const posts = await Post.find().sort('-createdAt')
        return res.json(posts);
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        //Pegando filename e alterando o nome para image
        //É apenas o nome da imagem
        const { filename: image } = req.file;

        //Separar o nome da imagem da extensão
        const [name] = image.split('.');

        //Noma da imagem com .jpg
        const fileName = `${name}.jpg`;

        //Antes de criar o post no banco de dados, faremos o redimensionamento
        //resize, passando o tamanho de 500 px pra altura ou largura
        //jpeg, passando a qualidade da imagem
        //toFile, exportando para um novo arquivo
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            //Passando o caminho até a pasta resized com o nome da imagem
            .toFile(path.resolve(req.file.destination, 'resized', fileName));

        //Apagando a imagem original, que não foi redimensionada que esta dentro de /uploads
        fs.unlinkSync(req.file.path);

        //Podemos ver o que tem dentro do req.file
        /* return res.json(req.file) */

        //Salvando no banco de dados
        //Quando utilizamos uma ação que pode demorar, utilizamos o await, ai ele vai esperar finalizar
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName
        });

        //Quando um novo post for enviado, vamos emitir a informação à todos os usuários que estão
        //conectados na aplicação com o nome de post 
        req.io.emit('post', post);

        //Para fazer o express entender o formato do corpo em multipart form, precisamos do multer
        return res.json(post)
    }
};